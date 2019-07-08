Conventions
===========

Landr prides itself with being a zero configuration tool, and relying on your
repository and related conventions to perform its job.

This document presents a list of conventions we recommend in order to make the
best out of Landr. Apart from this list, The [Landr GitHub
Repository](https://github.com/balena-io/landr) aims to be an example of what
you can do with Landr, so check out how we do things there if unsure!

`README.md`
-----------

### Image Banner

Landr will parse the `README` file and if it finds an image at the top, it will
use it as the project banner/logo.

### Description

The first paragraph in the `README` before any section is considered to be the
repository description.

### Features

A list of paragraphs after the repository description, where each entry starts
with a set of words, a colon, and a paragraph is considered to be the project
features highlights.

### Motivation

A `README` section called `Motivation` is considered to be a longer description
of why the project exists.

`ARCHITECTURE.md`
-----------------

An in-depth description of how the project works under the hood, targetted at
potential contributors.

`CODE_OF_CONDUCT.md`
--------------------

The project's code of conduct for contributors.

`SECURITY.md`
-------------

Instructions on how to report a security vulnerability to the project.

`FAQ.md`
--------

A set of frequently asked questions and their corresponding answers. Each
section of the document is considered to be a different FAQ entry.

`CODEOWNERS`
------------

Landr will parse `CODEOWNERS` to determine who are the maintainers of the
repository.

`CONTRIBUTING.md`
-----------------

A getting started guide for starting to contribute to the project,
complementary to the `ARCHITECTURE.md` document.

`LICENSE`
---------

The license of the project.

`CNAME`
-------

The canonical domain of the project.

`docs/**/*.md`
--------------

A set of documentation files where sub-directories represent categories. The
ordering is determined alphabetically using the file names and the page title
is determined from the first title from the contents of the files.

`blog/YYYY-MM-DD-*.md`
----------------------

A set of blog posts. The published date is obtained from the file name, and the
author information is obtained through git.
