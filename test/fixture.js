tree = {
  "path": "./test/test_data",
  "name": "test_data",
  "children": [
    {
      "path": "test/test_data/file_a.txt",
      "name": "file_a.txt",
      "size": 12,
      "extension": ".txt"
    },
    {
      "path": "test/test_data/file_b.txt",
      "name": "file_b.txt",
      "size": 3756,
      "extension": ".txt"
    },
    {
      "path": "test/test_data/some_dir",
      "name": "some_dir",
      "children": [
        {
          "path": "test/test_data/some_dir/another_dir",
          "name": "another_dir",
          "children": [
            {
              "path": "test/test_data/some_dir/another_dir/file_a.txt",
              "name": "file_a.txt",
              "size": 12,
              "extension": ".txt"
            },
            {
              "path": "test/test_data/some_dir/another_dir/file_b.txt",
              "name": "file_b.txt",
              "size": 3756,
              "extension": ".txt"
            }
          ],
          "size": 3768
        },
        {
          "path": "test/test_data/some_dir/file_a.txt",
          "name": "file_a.txt",
          "size": 12,
          "extension": ".txt"
        },
        {
          "path": "test/test_data/some_dir/file_b.txt",
          "name": "file_b.txt",
          "size": 3756,
          "extension": ".txt"
        }
      ],
      "size": 7536
    },
    {
      "path": "test/test_data/some_dir_2",
      "name": "some_dir_2",
      "children": [
        {
          "path": "test/test_data/some_dir_2/.gitkeep",
          "name": ".gitkeep",
          "size": 0,
          "extension": ""
        }
      ],
      "size": 0
    }
  ],
  "size": 11304
}

module.exports = tree;
