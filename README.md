# lineup-stream

Concatenate multiple streams into a single readable stream and line up buffers.

## Usage

```js
var lineup = require('lineup-stream')

var read1 = stream()
var read2 = stream()

lineup(read1, read2)
  .pipe(writer);
```
