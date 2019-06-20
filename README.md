## Arcadia Homepage

A homepage that uses a small golang program to allow for easy managment of links.

Links are defined in `config.toml`. The general format of the config file is as follows:

There is an example config called `config.example.toml` in the root directory.

``` toml
[[icon-links]] # An icon link. Uses font awesome 4 to display the icons
url = "https://reddit.com"
icon = "reddit"

[[columns.example]] # You can have up to four unique columns. The name after the dot is the name of the column ("example")
url = "https://example.org"
label = "Example" # this is what is actually displayed for the link

[[columns.example]] # this is how to add another link to a column
url = "http://github.com"
label = "GitHub"
```
