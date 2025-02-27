import importlib.abc 
import importlib.machinery
import importlib.util

import sys
import os

# Finds modules by stupidly fetching from the server
class FetchPathFinder(importlib.abc.MetaPathFinder):
	@classmethod
	def find_spec(cls, fullname, path, target=None):
		if path is None or len(path) == 0:
			path = os.getcwd()
		else:
			path = path[0]
	
		module_name = fullname.split(".")[-1]
		suffixed = [module_name + suffix for suffix in importlib.machinery.SOURCE_SUFFIXES]
		# Due to the lack of directory listings, we'll just force nested modules to have an __init__.py
		for relpath in [*suffixed, os.path.join(module_name, "__init__.py")]:
			fullpath = os.path.join(path, relpath)
			try:
				# This will cause a lazy load from the server
				open(fullpath, "r").close()
			except Exception:
				continue
	
			loader = importlib.machinery.SourceFileLoader(fullname, fullpath)
			return importlib.util.spec_from_loader(fullname, loader=loader)
		return None
		
	@classmethod
	def invalidate_caches(cls):
		return

sys.meta_path.append(FetchPathFinder)
