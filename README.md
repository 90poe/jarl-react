# jarl-react

Just Another Router Library for React.

## Philosophy

* URLs are a public API into your appplication
* Routes define a mapping between URL and state
* Routing is a core part of your application logic
* A router should not dictate state mechanism nor navigation lifecycle
* Data dependencies are closely bound to routes

Putting all of this together, I wanted a router that performs the simple-sounding
task of keeping the URL and the state in sync, whilst not getting in the way
of application structure, and not requiring learning a component API for
basic conditional rendering tasks. For instance, JARL does not have a `Route`
component: a vanilla JavaScript `switch` statement is perfectly adequate!

Cautionary note: I am still evolving the API based on my own real use-cases. Expect
more things to change, but also many new features.

## Documentation

See docs here:
https://github.com/downplay/jarl-react/tree/master/docs

## Install

```
yarn add jarl-react
```

## Tests & Demos

```
git clone https://github.com/downplay/jarl-react
cd jarl-react
yarn
```

To run unit tests:

```
yarn test
```

To run demo:

```
yarn demo
```

To run e2e tests (using [cypress.io](https://cypress.io)):

```
yarn e2e
```

## Credits

Pattern matching by `url-pattern`: https://github.com/snd/url-pattern (MIT license)

(Currently using custom build at this fork: https://github.com/downplay/url-pattern)

Some ideas and inspiration from `redux-first-router`: https://github.com/faceyspacey/redux-first-router

## Version History

### Next version

* Breaking: Rename resolve->stringify. Resolve is already an overloaded term in JS. Stringify is much clearer meaning.
* Better errors on stringification failure to debug state problems
* Breaking: Rename withRouting->withNavigate. This HOC only injects a `navigate` function so the name was confusing
* Add a new withState HOC to inject the current route's state
* Added many tests! Including E2E tests with cypress
* Started writing some proper documentation, updated README a bit
* Switched to custom build of `url-pattern` to support named wildcards with syntax: `/*:name`
* Breaking: Restructured to monorepo design with `lerna`. Redux extensions are now in separate `jarl-react-redux` package

### 0.2.0

* Added route matching and path resolution for nested routes

### 0.1.2

* Don't completely override Link's own onClick handler

### 0.1.1

* Call onClick handler when Link is clicked (e.g. allowing consumers to call `event.stopPropagation()`)

### 0.1.0

* Routes with dynamic path segments now resolve to URLs correctly

### 0.0.8

* Link now supports string values for `to` prop
* Add enzyme config and a Link test

### 0.0.5

* Initial release

## Copyright

&copy;2017 Downplay Ltd

Distributed under MIT license. See LICENSE for full details.
