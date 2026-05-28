project = "Edu Topic Manager"
author = "NikShep21"
release = "1.0.0"

extensions = [
    "myst_parser",
]

source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

master_doc = "index"

templates_path = ["_templates"]
exclude_patterns = [
    "_build",
    "Thumbs.db",
    ".DS_Store",
    "assets/diagrams/sources/*.mmd",
]

html_theme = "alabaster"
html_static_path = ["assets"]