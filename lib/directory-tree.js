'use strict';

const FS = require('fs');
const PATH = require('path');
const _ = require("lodash");
const constants = {
	DIRECTORY: 'directory',
	FILE: 'file'
}

function safeReadDirSync (path) {
	let dirData = {};
	try {
		dirData = FS.readdirSync(path);
	} catch(ex) {
		if (ex.code == "EACCES")
			//User does not have permissions, ignore directory
			return null;
		else throw ex;
	}
	return dirData;
}

// Put directories at the top
const sortFoldersToTop = (tree) => {
    if (tree.children) {
        // This is a directory 
        tree["children"] = _.orderBy(tree.children, ['children'], ['asc']);
        tree["foldername"] = tree.name;
        tree.children.forEach(child => {
            sortFoldersToTop(child);
        });
    }
    return tree;
}

// Sort directories alphabetically
const sortFoldersByName = (tree) => {
    if (tree.children) {
        // This is a directory 
        tree["children"] = _.orderBy(tree.children, ['foldername'], ['asc']);
        tree.children.forEach(child => {
            sortFoldersByName(child);
        });
    }
    return tree;
}

const getSortedTree = (tree) => {
    let sortedTree = sortFoldersToTop(tree);
    let newTree = sortFoldersByName(sortedTree);
    return newTree;
}

function directoryTree(parentPath, subPath, options, onEachFile) {
	const name = PATH.basename(parentPath+subPath);
	const item = { path:subPath, name };
	let stats;

	try { stats = FS.statSync(parentPath+subPath); }
	catch (e) { return null; }
	if (stats.isFile()) {
		const ext = PATH.extname(parentPath+subPath).toLowerCase();

		// Only add files with the provided extensions
		if (options && 
			options.extensions && 
			options.extensions.length && 
			options.extensions.indexOf(ext) === -1)
			return null;

		item.size = stats.size;  // File size in bytes
		item.extension = ext;
		item.type = constants.FILE;
		if (onEachFile) {
			onEachFile(item, PATH);
		}
	}
	else if (stats.isDirectory()) {
		let dirData = safeReadDirSync(parentPath+subPath);
		if (dirData === null) return null;
		item.children = dirData
			.map(child => directoryTree(parentPath,PATH.join(subPath, child), options, onEachFile))
			.filter(e => !!e);
		item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
		item.type = constants.DIRECTORY;
	} else {
		return null; // Or set item.size = 0 for devices, FIFO and sockets ?
	}

	return getSortedTree(item);
}

module.exports = directoryTree;