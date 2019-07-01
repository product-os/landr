Contributing to Landr
=====================

We're happy you're interested in Landr!

As a first step, make sure to take a look at the [architecture
document](https://github.com/balena-io/landr/blob/master/ARCHITECTURE.md),
which describes how Landr works.

What can I contribute on?
-------------------------

The main areas we would love to get your help with are:

- Extending Landr to understand more open source conventions

Have you seen open source projects adopting a new convention that would allow
us to understand the project better and produce better websites? Let us know,
or even better: make Landr understand them!

- Making Landr sites look good no matter what information is available

Each project is unique, and the parts that Landr can infer out of the box
change depending on the project. We want to consider all these combinations and
create adaptative websites no matter what subset of information we have.

The best way to test this is by attempting to run Landr on any of your
projects, and checking if the results are not satisfactory.

Commit Conventions
------------------

Landr uses the
[OpenEmbedded](https://www.openembedded.org/wiki/Commit_Patch_Message_Guidelines)
commit conventions. We also require a `Change-type` footer tag that is either
`patch`, `minor`, or `major`, depending on the change your patch makes in terms
of [Semantic Versioning](https://semver.org).

Balena CI
---------

Landr makes use of Balena's internal CI system which noy only runs the tests,
but automatically generates a CHANGELOG based on your commits and their
corresponding `Change-type`s.

Tests
-----

You may run the test suite with the `npm test` command. We enable code coverage
support, and you can see the report after running the tests by opening
`coverage/index.html` in your browser.

EditorConfig
------------

This project makes use of [EditorConfig](https://editorconfig.org). Make sure
your editor supports it so that it doesn't deviate from indentation, line
endings, and other text related conventions.
