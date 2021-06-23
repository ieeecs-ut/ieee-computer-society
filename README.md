UT Austin IEEE Computer Society Website
=================

## Build & Host Locally

1. `git clone` this repo
1. Follow Jekyll quickstart here: https://jekyllrb.com/docs/
1. If you encounter `ffi` build errors, run `bundle config build.ffi --with-cflags="-Wno-error=implicit-function-declaration"` and then `bundle install`
1. Host/build locally: `bundle exec jekyll serve`
1. Make your changes, then serve/host the new/changed files on the web server
