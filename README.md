stringspace.js [![Build Status](https://travis-ci.org/jaridmargolin/stringspace.js.png)](https://travis-ci.org/jaridmargolin/stringspace.js)
==============

Utility for using namespaced strings to get and set object properties.



## API

### new Stringspace(opts)

Create new Stringspace utiliy instance.

#### PARAMETERS:

* **seperator**: String -- '.' -- The character used as the namespace seperator.

#### Returns

Stringspace instance.

##### EXAMPLE USAGE:

```
var strspc = new Stringspace(':');
```

### Stringspace.set(object, stringName, value)

Set value on the specified object at the given str.

##### PARAMETERS:

* **\*object**: The object to set the value on.
* **\*stringName**: The property of the object to return.
* **\*value**: The value to set at the given str.

##### RETURNS:

Returns the set value.

##### EXAMPLE USAGE:

```
var obj = {};

strspc.set(obj, 'nested:param:name', 'value');
```

### Stringspace.get(object, stringName)

Return the value of the specied object at the given str.

##### PARAMETERS:

* **\*object**: The object to query.
* **\*stringName**: The property of the object to return.

##### RETURNS:

Value at the speciied value.

##### EXAMPLE USAGE:

```
var value = strspc.get(obj, 'nested:param:name');
```



## TESTS

**Install Dependencies**

```
npm install
```

**Run/View**

```
npm test
```



## License

The MIT License (MIT) Copyright (c) 2014 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.