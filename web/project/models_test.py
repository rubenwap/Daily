import os
import models
import unittest
import tempfile


class modelsTestCase(unittest.TestCase):

    def test_empty_db(self):
        rv = models.create_api.get('/api/')
        assert b'No entries here so far' in rv.data


if __name__ == '__main__':
    unittest.main()
