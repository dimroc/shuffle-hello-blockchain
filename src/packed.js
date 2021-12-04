(() => {
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };

  // deno:https://deno.land/std@0.116.0/_util/os.ts
  var osType = (() => {
    const { Deno: Deno2 } = globalThis;
    if (typeof Deno2?.build?.os === "string") {
      return Deno2.build.os;
    }
    const { navigator } = globalThis;
    if (navigator?.appVersion?.includes?.("Win") ?? false) {
      return "windows";
    }
    return "linux";
  })();

  // deno:https://deno.land/std@0.85.0/node/_util/_util_promisify.ts
  var kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
  var kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");
  var NodeInvalidArgTypeError = class extends TypeError {
    constructor(argumentName, type, received) {
      super(`The "${argumentName}" argument must be of type ${type}. Received ${typeof received}`);
      this.code = "ERR_INVALID_ARG_TYPE";
    }
  };
  function promisify(original) {
    if (typeof original !== "function") {
      throw new NodeInvalidArgTypeError("original", "Function", original);
    }
    if (original[kCustomPromisifiedSymbol]) {
      const fn2 = original[kCustomPromisifiedSymbol];
      if (typeof fn2 !== "function") {
        throw new NodeInvalidArgTypeError("util.promisify.custom", "Function", fn2);
      }
      return Object.defineProperty(fn2, kCustomPromisifiedSymbol, {
        value: fn2,
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    const argumentNames = original[kCustomPromisifyArgsSymbol];
    function fn(...args) {
      return new Promise((resolve, reject) => {
        original.call(this, ...args, (err, ...values) => {
          if (err) {
            return reject(err);
          }
          if (argumentNames !== void 0 && values.length > 1) {
            const obj = {};
            for (let i = 0; i < argumentNames.length; i++) {
              obj[argumentNames[i]] = values[i];
            }
            resolve(obj);
          } else {
            resolve(values[0]);
          }
        });
      });
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
  }
  promisify.custom = kCustomPromisifiedSymbol;

  // deno:https://deno.land/std@0.85.0/fmt/colors.ts
  var noColor = globalThis.Deno?.noColor ?? true;
  var ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|"), "g");

  // deno:https://deno.land/std@0.85.0/testing/_diff.ts
  var DiffType;
  (function(DiffType2) {
    DiffType2["removed"] = "removed";
    DiffType2["common"] = "common";
    DiffType2["added"] = "added";
  })(DiffType || (DiffType = {}));

  // deno:https://deno.land/std@0.85.0/testing/asserts.ts
  var AssertionError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "AssertionError";
    }
  };
  function unreachable() {
    throw new AssertionError("unreachable");
  }

  // deno:https://deno.land/std@0.85.0/node/_errors.ts
  var windows = [
    [-4093, ["E2BIG", "argument list too long"]],
    [-4092, ["EACCES", "permission denied"]],
    [-4091, ["EADDRINUSE", "address already in use"]],
    [-4090, ["EADDRNOTAVAIL", "address not available"]],
    [-4089, ["EAFNOSUPPORT", "address family not supported"]],
    [-4088, ["EAGAIN", "resource temporarily unavailable"]],
    [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-4084, ["EALREADY", "connection already in progress"]],
    [-4083, ["EBADF", "bad file descriptor"]],
    [-4082, ["EBUSY", "resource busy or locked"]],
    [-4081, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-4079, ["ECONNABORTED", "software caused connection abort"]],
    [-4078, ["ECONNREFUSED", "connection refused"]],
    [-4077, ["ECONNRESET", "connection reset by peer"]],
    [-4076, ["EDESTADDRREQ", "destination address required"]],
    [-4075, ["EEXIST", "file already exists"]],
    [-4074, ["EFAULT", "bad address in system call argument"]],
    [-4036, ["EFBIG", "file too large"]],
    [-4073, ["EHOSTUNREACH", "host is unreachable"]],
    [-4072, ["EINTR", "interrupted system call"]],
    [-4071, ["EINVAL", "invalid argument"]],
    [-4070, ["EIO", "i/o error"]],
    [-4069, ["EISCONN", "socket is already connected"]],
    [-4068, ["EISDIR", "illegal operation on a directory"]],
    [-4067, ["ELOOP", "too many symbolic links encountered"]],
    [-4066, ["EMFILE", "too many open files"]],
    [-4065, ["EMSGSIZE", "message too long"]],
    [-4064, ["ENAMETOOLONG", "name too long"]],
    [-4063, ["ENETDOWN", "network is down"]],
    [-4062, ["ENETUNREACH", "network is unreachable"]],
    [-4061, ["ENFILE", "file table overflow"]],
    [-4060, ["ENOBUFS", "no buffer space available"]],
    [-4059, ["ENODEV", "no such device"]],
    [-4058, ["ENOENT", "no such file or directory"]],
    [-4057, ["ENOMEM", "not enough memory"]],
    [-4056, ["ENONET", "machine is not on the network"]],
    [-4035, ["ENOPROTOOPT", "protocol not available"]],
    [-4055, ["ENOSPC", "no space left on device"]],
    [-4054, ["ENOSYS", "function not implemented"]],
    [-4053, ["ENOTCONN", "socket is not connected"]],
    [-4052, ["ENOTDIR", "not a directory"]],
    [-4051, ["ENOTEMPTY", "directory not empty"]],
    [-4050, ["ENOTSOCK", "socket operation on non-socket"]],
    [-4049, ["ENOTSUP", "operation not supported on socket"]],
    [-4048, ["EPERM", "operation not permitted"]],
    [-4047, ["EPIPE", "broken pipe"]],
    [-4046, ["EPROTO", "protocol error"]],
    [-4045, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-4044, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-4034, ["ERANGE", "result too large"]],
    [-4043, ["EROFS", "read-only file system"]],
    [-4042, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-4041, ["ESPIPE", "invalid seek"]],
    [-4040, ["ESRCH", "no such process"]],
    [-4039, ["ETIMEDOUT", "connection timed out"]],
    [-4038, ["ETXTBSY", "text file is busy"]],
    [-4037, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-4033, ["ENXIO", "no such device or address"]],
    [-4032, ["EMLINK", "too many links"]],
    [-4031, ["EHOSTDOWN", "host is down"]],
    [-4030, ["EREMOTEIO", "remote I/O error"]],
    [-4029, ["ENOTTY", "inappropriate ioctl for device"]],
    [-4028, ["EFTYPE", "inappropriate file type or format"]],
    [-4027, ["EILSEQ", "illegal byte sequence"]]
  ];
  var darwin = [
    [-7, ["E2BIG", "argument list too long"]],
    [-13, ["EACCES", "permission denied"]],
    [-48, ["EADDRINUSE", "address already in use"]],
    [-49, ["EADDRNOTAVAIL", "address not available"]],
    [-47, ["EAFNOSUPPORT", "address family not supported"]],
    [-35, ["EAGAIN", "resource temporarily unavailable"]],
    [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-37, ["EALREADY", "connection already in progress"]],
    [-9, ["EBADF", "bad file descriptor"]],
    [-16, ["EBUSY", "resource busy or locked"]],
    [-89, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-53, ["ECONNABORTED", "software caused connection abort"]],
    [-61, ["ECONNREFUSED", "connection refused"]],
    [-54, ["ECONNRESET", "connection reset by peer"]],
    [-39, ["EDESTADDRREQ", "destination address required"]],
    [-17, ["EEXIST", "file already exists"]],
    [-14, ["EFAULT", "bad address in system call argument"]],
    [-27, ["EFBIG", "file too large"]],
    [-65, ["EHOSTUNREACH", "host is unreachable"]],
    [-4, ["EINTR", "interrupted system call"]],
    [-22, ["EINVAL", "invalid argument"]],
    [-5, ["EIO", "i/o error"]],
    [-56, ["EISCONN", "socket is already connected"]],
    [-21, ["EISDIR", "illegal operation on a directory"]],
    [-62, ["ELOOP", "too many symbolic links encountered"]],
    [-24, ["EMFILE", "too many open files"]],
    [-40, ["EMSGSIZE", "message too long"]],
    [-63, ["ENAMETOOLONG", "name too long"]],
    [-50, ["ENETDOWN", "network is down"]],
    [-51, ["ENETUNREACH", "network is unreachable"]],
    [-23, ["ENFILE", "file table overflow"]],
    [-55, ["ENOBUFS", "no buffer space available"]],
    [-19, ["ENODEV", "no such device"]],
    [-2, ["ENOENT", "no such file or directory"]],
    [-12, ["ENOMEM", "not enough memory"]],
    [-4056, ["ENONET", "machine is not on the network"]],
    [-42, ["ENOPROTOOPT", "protocol not available"]],
    [-28, ["ENOSPC", "no space left on device"]],
    [-78, ["ENOSYS", "function not implemented"]],
    [-57, ["ENOTCONN", "socket is not connected"]],
    [-20, ["ENOTDIR", "not a directory"]],
    [-66, ["ENOTEMPTY", "directory not empty"]],
    [-38, ["ENOTSOCK", "socket operation on non-socket"]],
    [-45, ["ENOTSUP", "operation not supported on socket"]],
    [-1, ["EPERM", "operation not permitted"]],
    [-32, ["EPIPE", "broken pipe"]],
    [-100, ["EPROTO", "protocol error"]],
    [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-34, ["ERANGE", "result too large"]],
    [-30, ["EROFS", "read-only file system"]],
    [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-29, ["ESPIPE", "invalid seek"]],
    [-3, ["ESRCH", "no such process"]],
    [-60, ["ETIMEDOUT", "connection timed out"]],
    [-26, ["ETXTBSY", "text file is busy"]],
    [-18, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-6, ["ENXIO", "no such device or address"]],
    [-31, ["EMLINK", "too many links"]],
    [-64, ["EHOSTDOWN", "host is down"]],
    [-4030, ["EREMOTEIO", "remote I/O error"]],
    [-25, ["ENOTTY", "inappropriate ioctl for device"]],
    [-79, ["EFTYPE", "inappropriate file type or format"]],
    [-92, ["EILSEQ", "illegal byte sequence"]]
  ];
  var linux = [
    [-7, ["E2BIG", "argument list too long"]],
    [-13, ["EACCES", "permission denied"]],
    [-98, ["EADDRINUSE", "address already in use"]],
    [-99, ["EADDRNOTAVAIL", "address not available"]],
    [-97, ["EAFNOSUPPORT", "address family not supported"]],
    [-11, ["EAGAIN", "resource temporarily unavailable"]],
    [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
    [-3001, ["EAI_AGAIN", "temporary failure"]],
    [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
    [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
    [-3003, ["EAI_CANCELED", "request canceled"]],
    [-3004, ["EAI_FAIL", "permanent failure"]],
    [-3005, ["EAI_FAMILY", "ai_family not supported"]],
    [-3006, ["EAI_MEMORY", "out of memory"]],
    [-3007, ["EAI_NODATA", "no address"]],
    [-3008, ["EAI_NONAME", "unknown node or service"]],
    [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
    [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
    [-3010, ["EAI_SERVICE", "service not available for socket type"]],
    [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
    [-114, ["EALREADY", "connection already in progress"]],
    [-9, ["EBADF", "bad file descriptor"]],
    [-16, ["EBUSY", "resource busy or locked"]],
    [-125, ["ECANCELED", "operation canceled"]],
    [-4080, ["ECHARSET", "invalid Unicode character"]],
    [-103, ["ECONNABORTED", "software caused connection abort"]],
    [-111, ["ECONNREFUSED", "connection refused"]],
    [-104, ["ECONNRESET", "connection reset by peer"]],
    [-89, ["EDESTADDRREQ", "destination address required"]],
    [-17, ["EEXIST", "file already exists"]],
    [-14, ["EFAULT", "bad address in system call argument"]],
    [-27, ["EFBIG", "file too large"]],
    [-113, ["EHOSTUNREACH", "host is unreachable"]],
    [-4, ["EINTR", "interrupted system call"]],
    [-22, ["EINVAL", "invalid argument"]],
    [-5, ["EIO", "i/o error"]],
    [-106, ["EISCONN", "socket is already connected"]],
    [-21, ["EISDIR", "illegal operation on a directory"]],
    [-40, ["ELOOP", "too many symbolic links encountered"]],
    [-24, ["EMFILE", "too many open files"]],
    [-90, ["EMSGSIZE", "message too long"]],
    [-36, ["ENAMETOOLONG", "name too long"]],
    [-100, ["ENETDOWN", "network is down"]],
    [-101, ["ENETUNREACH", "network is unreachable"]],
    [-23, ["ENFILE", "file table overflow"]],
    [-105, ["ENOBUFS", "no buffer space available"]],
    [-19, ["ENODEV", "no such device"]],
    [-2, ["ENOENT", "no such file or directory"]],
    [-12, ["ENOMEM", "not enough memory"]],
    [-64, ["ENONET", "machine is not on the network"]],
    [-92, ["ENOPROTOOPT", "protocol not available"]],
    [-28, ["ENOSPC", "no space left on device"]],
    [-38, ["ENOSYS", "function not implemented"]],
    [-107, ["ENOTCONN", "socket is not connected"]],
    [-20, ["ENOTDIR", "not a directory"]],
    [-39, ["ENOTEMPTY", "directory not empty"]],
    [-88, ["ENOTSOCK", "socket operation on non-socket"]],
    [-95, ["ENOTSUP", "operation not supported on socket"]],
    [-1, ["EPERM", "operation not permitted"]],
    [-32, ["EPIPE", "broken pipe"]],
    [-71, ["EPROTO", "protocol error"]],
    [-93, ["EPROTONOSUPPORT", "protocol not supported"]],
    [-91, ["EPROTOTYPE", "protocol wrong type for socket"]],
    [-34, ["ERANGE", "result too large"]],
    [-30, ["EROFS", "read-only file system"]],
    [-108, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
    [-29, ["ESPIPE", "invalid seek"]],
    [-3, ["ESRCH", "no such process"]],
    [-110, ["ETIMEDOUT", "connection timed out"]],
    [-26, ["ETXTBSY", "text file is busy"]],
    [-18, ["EXDEV", "cross-device link not permitted"]],
    [-4094, ["UNKNOWN", "unknown error"]],
    [-4095, ["EOF", "end of file"]],
    [-6, ["ENXIO", "no such device or address"]],
    [-31, ["EMLINK", "too many links"]],
    [-112, ["EHOSTDOWN", "host is down"]],
    [-121, ["EREMOTEIO", "remote I/O error"]],
    [-25, ["ENOTTY", "inappropriate ioctl for device"]],
    [-4028, ["EFTYPE", "inappropriate file type or format"]],
    [-84, ["EILSEQ", "illegal byte sequence"]]
  ];
  var os = "darwin";
  var errorMap = new Map(os === "windows" ? windows : os === "darwin" ? darwin : os === "linux" ? linux : unreachable());

  // deno:https://deno.land/std@0.85.0/async/deferred.ts
  function deferred() {
    let methods;
    const promise = new Promise((resolve, reject) => {
      methods = { resolve, reject };
    });
    return Object.assign(promise, methods);
  }

  // deno:https://deno.land/std@0.85.0/async/mux_async_iterator.ts
  var MuxAsyncIterator = class {
    constructor() {
      this.iteratorCount = 0;
      this.yields = [];
      this.throws = [];
      this.signal = deferred();
    }
    add(iterator) {
      ++this.iteratorCount;
      this.callIteratorNext(iterator);
    }
    async callIteratorNext(iterator) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          --this.iteratorCount;
        } else {
          this.yields.push({ iterator, value });
        }
      } catch (e) {
        this.throws.push(e);
      }
      this.signal.resolve();
    }
    async *iterate() {
      while (this.iteratorCount > 0) {
        await this.signal;
        for (let i = 0; i < this.yields.length; i++) {
          const { iterator, value } = this.yields[i];
          yield value;
          this.callIteratorNext(iterator);
        }
        if (this.throws.length) {
          for (const e of this.throws) {
            throw e;
          }
          this.throws.length = 0;
        }
        this.yields.length = 0;
        this.signal = deferred();
      }
    }
    [Symbol.asyncIterator]() {
      return this.iterate();
    }
  };

  // deno:https://deno.land/std@0.85.0/node/_utils.ts
  var _TextDecoder = TextDecoder;
  var _TextEncoder = TextEncoder;

  // deno:https://deno.land/std@0.85.0/node/util.ts
  var NumberIsSafeInteger = Number.isSafeInteger;
  var DEFAULT_INSPECT_OPTIONS = {
    showHidden: false,
    depth: 2,
    colors: false,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: Infinity,
    breakLength: 80,
    compact: 3,
    sorted: false,
    getters: false
  };
  inspect.defaultOptions = DEFAULT_INSPECT_OPTIONS;
  // inspect.custom = Deno.customInspect;
  function inspect(object, ...opts) {
    opts = { ...DEFAULT_INSPECT_OPTIONS, ...opts };
    return Deno.inspect(object, {
      depth: opts.depth,
      iterableLimit: opts.maxArrayLength,
      compact: !!opts.compact,
      sorted: !!opts.sorted,
      showProxy: !!opts.showProxy
    });
  }
  var TextDecoder2 = _TextDecoder;
  var TextEncoder2 = _TextEncoder;

  // deno:file:///Users/droc/tmp/diffrepo/main/generated/serde/binarySerializer.ts
  var _BinarySerializer = class {
    constructor() {
      this.buffer = new ArrayBuffer(64);
      this.offset = 0;
    }
    ensureBufferWillHandleSize(bytes) {
      while (this.buffer.byteLength < this.offset + bytes) {
        const newBuffer = new ArrayBuffer(this.buffer.byteLength * 2);
        new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
        this.buffer = newBuffer;
      }
    }
    serialize(values) {
      this.ensureBufferWillHandleSize(values.length);
      new Uint8Array(this.buffer, this.offset).set(values);
      this.offset += values.length;
    }
    serializeStr(value) {
      this.serializeBytes(_BinarySerializer.textEncoder.encode(value));
    }
    serializeBytes(value) {
      this.serializeLen(value.length);
      this.serialize(value);
    }
    serializeBool(value) {
      const byteValue = value ? 1 : 0;
      this.serialize(new Uint8Array([byteValue]));
    }
    serializeUnit(_value) {
      return;
    }
    serializeWithFunction(fn, bytesLength, value) {
      this.ensureBufferWillHandleSize(bytesLength);
      const dv = new DataView(this.buffer, this.offset);
      fn.apply(dv, [0, value, true]);
      this.offset += bytesLength;
    }
    serializeU8(value) {
      this.serialize(new Uint8Array([value]));
    }
    serializeU16(value) {
      this.serializeWithFunction(DataView.prototype.setUint16, 2, value);
    }
    serializeU32(value) {
      this.serializeWithFunction(DataView.prototype.setUint32, 4, value);
    }
    serializeU64(value) {
      const low = BigInt(value.toString()) & _BinarySerializer.BIG_32Fs;
      const high = BigInt(value.toString()) >> _BinarySerializer.BIG_32;
      this.serializeU32(Number(low));
      this.serializeU32(Number(high));
    }
    serializeU128(value) {
      const low = BigInt(value.toString()) & _BinarySerializer.BIG_64Fs;
      const high = BigInt(value.toString()) >> _BinarySerializer.BIG_64;
      this.serializeU64(low);
      this.serializeU64(high);
    }
    serializeI8(value) {
      const bytes = 1;
      this.ensureBufferWillHandleSize(bytes);
      new DataView(this.buffer, this.offset).setInt8(0, value);
      this.offset += bytes;
    }
    serializeI16(value) {
      const bytes = 2;
      this.ensureBufferWillHandleSize(bytes);
      new DataView(this.buffer, this.offset).setInt16(0, value, true);
      this.offset += bytes;
    }
    serializeI32(value) {
      const bytes = 4;
      this.ensureBufferWillHandleSize(bytes);
      new DataView(this.buffer, this.offset).setInt32(0, value, true);
      this.offset += bytes;
    }
    serializeI64(value) {
      const low = BigInt(value) & _BinarySerializer.BIG_32Fs;
      const high = BigInt(value) >> _BinarySerializer.BIG_32;
      this.serializeI32(Number(low));
      this.serializeI32(Number(high));
    }
    serializeI128(value) {
      const low = BigInt(value) & _BinarySerializer.BIG_64Fs;
      const high = BigInt(value) >> _BinarySerializer.BIG_64;
      this.serializeI64(low);
      this.serializeI64(high);
    }
    serializeOptionTag(value) {
      this.serializeBool(value);
    }
    getBufferOffset() {
      return this.offset;
    }
    getBytes() {
      return new Uint8Array(this.buffer).slice(0, this.offset);
    }
    serializeChar(_value) {
      throw new Error("Method serializeChar not implemented.");
    }
    serializeF32(value) {
      const bytes = 4;
      this.ensureBufferWillHandleSize(bytes);
      new DataView(this.buffer, this.offset).setFloat32(0, value, true);
      this.offset += bytes;
    }
    serializeF64(value) {
      const bytes = 8;
      this.ensureBufferWillHandleSize(bytes);
      new DataView(this.buffer, this.offset).setFloat64(0, value, true);
      this.offset += bytes;
    }
  };
  var BinarySerializer = _BinarySerializer;
  BinarySerializer.BIG_32 = BigInt(32);
  BinarySerializer.BIG_64 = BigInt(64);
  BinarySerializer.BIG_32Fs = BigInt("4294967295");
  BinarySerializer.BIG_64Fs = BigInt("18446744073709551615");
  BinarySerializer.textEncoder = typeof window === "undefined" ? new TextEncoder2() : new TextEncoder();

  // deno:file:///Users/droc/tmp/diffrepo/main/generated/serde/binaryDeserializer.ts
  var _BinaryDeserializer = class {
    constructor(data) {
      this.buffer = new ArrayBuffer(data.length);
      new Uint8Array(this.buffer).set(data, 0);
      this.offset = 0;
    }
    read(length) {
      const bytes = this.buffer.slice(this.offset, this.offset + length);
      this.offset += length;
      return bytes;
    }
    deserializeStr() {
      const value = this.deserializeBytes();
      return _BinaryDeserializer.textDecoder.decode(value);
    }
    deserializeBytes() {
      const len = this.deserializeLen();
      if (len < 0) {
        throw new Error("Length of a bytes array can't be negative");
      }
      return new Uint8Array(this.read(len));
    }
    deserializeBool() {
      const bool = new Uint8Array(this.read(1))[0];
      return bool == 1;
    }
    deserializeUnit() {
      return null;
    }
    deserializeU8() {
      return new DataView(this.read(1)).getUint8(0);
    }
    deserializeU16() {
      return new DataView(this.read(2)).getUint16(0, true);
    }
    deserializeU32() {
      return new DataView(this.read(4)).getUint32(0, true);
    }
    deserializeU64() {
      const low = this.deserializeU32();
      const high = this.deserializeU32();
      return BigInt(BigInt(high.toString()) << _BinaryDeserializer.BIG_32 | BigInt(low.toString()));
    }
    deserializeU128() {
      const low = this.deserializeU64();
      const high = this.deserializeU64();
      return BigInt(BigInt(high.toString()) << _BinaryDeserializer.BIG_64 | BigInt(low.toString()));
    }
    deserializeI8() {
      return new DataView(this.read(1)).getInt8(0);
    }
    deserializeI16() {
      return new DataView(this.read(2)).getInt16(0, true);
    }
    deserializeI32() {
      return new DataView(this.read(4)).getInt32(0, true);
    }
    deserializeI64() {
      const low = this.deserializeI32();
      const high = this.deserializeI32();
      return BigInt(high.toString()) << _BinaryDeserializer.BIG_32 | BigInt(low.toString());
    }
    deserializeI128() {
      const low = this.deserializeI64();
      const high = this.deserializeI64();
      return BigInt(high.toString()) << _BinaryDeserializer.BIG_64 | BigInt(low.toString());
    }
    deserializeOptionTag() {
      return this.deserializeBool();
    }
    getBufferOffset() {
      return this.offset;
    }
    deserializeChar() {
      throw new Error("Method deserializeChar not implemented.");
    }
    deserializeF32() {
      return new DataView(this.read(4)).getFloat32(0, true);
    }
    deserializeF64() {
      return new DataView(this.read(8)).getFloat64(0, true);
    }
  };
  var BinaryDeserializer = _BinaryDeserializer;
  BinaryDeserializer.BIG_32 = BigInt(32);
  BinaryDeserializer.BIG_64 = BigInt(64);
  BinaryDeserializer.textDecoder = typeof window === "undefined" ? new TextDecoder2() : new TextDecoder();

  // deno:file:///Users/droc/tmp/diffrepo/main/generated/bcs/bcsDeserializer.ts
  var _BcsDeserializer = class extends BinaryDeserializer {
    deserializeUleb128AsU32() {
      let value = 0;
      for (let shift = 0; shift < 32; shift += 7) {
        const x = this.deserializeU8();
        const digit = x & 127;
        value = value | digit << shift;
        if (value < 0 || value > _BcsDeserializer.MAX_UINT_32) {
          throw new Error("Overflow while parsing uleb128-encoded uint32 value");
        }
        if (digit == x) {
          if (shift > 0 && digit == 0) {
            throw new Error("Invalid uleb128 number (unexpected zero digit)");
          }
          return value;
        }
      }
      throw new Error("Overflow while parsing uleb128-encoded uint32 value");
    }
    deserializeLen() {
      return this.deserializeUleb128AsU32();
    }
    deserializeVariantIndex() {
      return this.deserializeUleb128AsU32();
    }
    checkThatKeySlicesAreIncreasing(_key1, _key2) {
      return;
    }
  };
  var BcsDeserializer = _BcsDeserializer;
  BcsDeserializer.MAX_UINT_32 = 2 ** 32 - 1;

  // deno:file:///Users/droc/tmp/diffrepo/main/context.ts
  var consoleContext = null;
  var defaultUserContext = null;
  function addressOrDefault(addr) {
    return addr || "unkonwn";
  }
  function client() {
    return consoleContext.client;
  }

  // deno:file:///Users/droc/tmp/diffrepo/main/devapi.ts
  async function account(addr) {
    addr = addressOrDefault(addr);
    return await client().getAccount(addr);
  }
  async function sequenceNumber(addr) {
    const acc = await account(addr);
    return parseInt(acc.sequence_number);
  }
  async function createSigningMessage(body) {
    return await client().createSigningMessage(body);
  }
  async function submitTransaction(body) {
    return await client().submitTransaction(body);
  }

  // deno:https://raw.githubusercontent.com/dimroc/noble-ed25519/main/index.ts
  var CURVE = {
    a: -1n,
    d: 37095705934669439343138083508754565189542113879843219016388785533085940283555n,
    P: 2n ** 255n - 19n,
    n: 2n ** 252n + 27742317777372353535851937790883648493n,
    h: 8n,
    Gx: 15112221349535400772501151409588531511454012693041857206046113283949847762202n,
    Gy: 46316835694926478169428394003475163141307993866256225615783033603165251855960n
  };
  var B32 = 32;
  var SQRT_M1 = 19681161376707505956807079304988542015446066515923890162744021073123829784752n;
  var SQRT_AD_MINUS_ONE = 25063068953384623474111414158702152701244531502492656460079210482610430750235n;
  var INVSQRT_A_MINUS_D = 54469307008909316920995813868745141605393597292927456921205312896311721017578n;
  var ONE_MINUS_D_SQ = 1159843021668779879193775521855586647937357759715417654439879720876111806838n;
  var D_MINUS_ONE_SQ = 40440834346308536858101042469323190826248399146238708352240133220865137265952n;
  var _ExtendedPoint = class {
    constructor(x, y, z, t) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.t = t;
    }
    static fromAffine(p) {
      if (!(p instanceof Point)) {
        throw new TypeError("ExtendedPoint#fromAffine: expected Point");
      }
      if (p.equals(Point.ZERO))
        return _ExtendedPoint.ZERO;
      return new _ExtendedPoint(p.x, p.y, 1n, mod(p.x * p.y));
    }
    static toAffineBatch(points) {
      const toInv = invertBatch(points.map((p) => p.z));
      return points.map((p, i) => p.toAffine(toInv[i]));
    }
    static normalizeZ(points) {
      return this.toAffineBatch(points).map(this.fromAffine);
    }
    static fromRistrettoHash(hash) {
      const r1 = bytes255ToNumberLE(hash.slice(0, B32));
      const R1 = this.calcElligatorRistrettoMap(r1);
      const r2 = bytes255ToNumberLE(hash.slice(B32, B32 * 2));
      const R2 = this.calcElligatorRistrettoMap(r2);
      return R1.add(R2);
    }
    static calcElligatorRistrettoMap(r0) {
      const { d } = CURVE;
      const r = mod(SQRT_M1 * r0 * r0);
      const Ns = mod((r + 1n) * ONE_MINUS_D_SQ);
      let c = -1n;
      const D = mod((c - d * r) * mod(r + d));
      let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
      let s_ = mod(s * r0);
      if (!edIsNegative(s_))
        s_ = mod(-s_);
      if (!Ns_D_is_sq)
        s = s_;
      if (!Ns_D_is_sq)
        c = r;
      const Nt = mod(c * (r - 1n) * D_MINUS_ONE_SQ - D);
      const s2 = s * s;
      const W0 = mod((s + s) * D);
      const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
      const W2 = mod(1n - s2);
      const W3 = mod(1n + s2);
      return new _ExtendedPoint(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
    }
    static fromRistrettoBytes(bytes) {
      const { a, d } = CURVE;
      const emsg = "ExtendedPoint.fromRistrettoBytes: Cannot convert bytes to Ristretto Point";
      const s = bytes255ToNumberLE(bytes);
      if (!equalBytes(numberToBytesPadded(s, B32), bytes) || edIsNegative(s))
        throw new Error(emsg);
      const s2 = mod(s * s);
      const u1 = mod(1n + a * s2);
      const u2 = mod(1n - a * s2);
      const u1_2 = mod(u1 * u1);
      const u2_2 = mod(u2 * u2);
      const v = mod(a * d * u1_2 - u2_2);
      const { isValid, value: I } = invertSqrt(mod(v * u2_2));
      const Dx = mod(I * u2);
      const Dy = mod(I * Dx * v);
      let x = mod((s + s) * Dx);
      if (edIsNegative(x))
        x = mod(-x);
      const y = mod(u1 * Dy);
      const t = mod(x * y);
      if (!isValid || edIsNegative(t) || y === 0n)
        throw new Error(emsg);
      return new _ExtendedPoint(x, y, 1n, t);
    }
    toRistrettoBytes() {
      let { x, y, z, t } = this;
      const u1 = mod(mod(z + y) * mod(z - y));
      const u2 = mod(x * y);
      const { value: invsqrt } = invertSqrt(mod(u1 * u2 ** 2n));
      const D1 = mod(invsqrt * u1);
      const D2 = mod(invsqrt * u2);
      const zInv = mod(D1 * D2 * t);
      let D;
      if (edIsNegative(t * zInv)) {
        let _x = mod(y * SQRT_M1);
        let _y = mod(x * SQRT_M1);
        x = _x;
        y = _y;
        D = mod(D1 * INVSQRT_A_MINUS_D);
      } else {
        D = D2;
      }
      if (edIsNegative(x * zInv))
        y = mod(-y);
      let s = mod((z - y) * D);
      if (edIsNegative(s))
        s = mod(-s);
      return numberToBytesPadded(s, B32);
    }
    equals(other) {
      const a = this;
      const b = other;
      return mod(a.t * b.z) === mod(b.t * a.z);
    }
    negate() {
      return new _ExtendedPoint(mod(-this.x), this.y, this.z, mod(-this.t));
    }
    double() {
      const X1 = this.x;
      const Y1 = this.y;
      const Z1 = this.z;
      const { a } = CURVE;
      const A = mod(X1 ** 2n);
      const B = mod(Y1 ** 2n);
      const C = mod(2n * Z1 ** 2n);
      const D = mod(a * A);
      const E = mod((X1 + Y1) ** 2n - A - B);
      const G = mod(D + B);
      const F = mod(G - C);
      const H = mod(D - B);
      const X3 = mod(E * F);
      const Y3 = mod(G * H);
      const T3 = mod(E * H);
      const Z3 = mod(F * G);
      return new _ExtendedPoint(X3, Y3, Z3, T3);
    }
    add(other) {
      const X1 = this.x;
      const Y1 = this.y;
      const Z1 = this.z;
      const T1 = this.t;
      const X2 = other.x;
      const Y2 = other.y;
      const Z2 = other.z;
      const T2 = other.t;
      const A = mod((Y1 - X1) * (Y2 + X2));
      const B = mod((Y1 + X1) * (Y2 - X2));
      const F = mod(B - A);
      if (F === 0n) {
        return this.double();
      }
      const C = mod(Z1 * 2n * T2);
      const D = mod(T1 * 2n * Z2);
      const E = mod(D + C);
      const G = mod(B + A);
      const H = mod(D - C);
      const X3 = mod(E * F);
      const Y3 = mod(G * H);
      const T3 = mod(E * H);
      const Z3 = mod(F * G);
      return new _ExtendedPoint(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    multiplyUnsafe(scalar) {
      let n = normalizeScalar(scalar);
      if (n === 1n)
        return this;
      let p = _ExtendedPoint.ZERO;
      let d = this;
      while (n > 0n) {
        if (n & 1n)
          p = p.add(d);
        d = d.double();
        n >>= 1n;
      }
      return p;
    }
    precomputeWindow(W) {
      const windows2 = 256 / W + 1;
      let points = [];
      let p = this;
      let base = p;
      for (let window2 = 0; window2 < windows2; window2++) {
        base = p;
        points.push(base);
        for (let i = 1; i < 2 ** (W - 1); i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    }
    wNAF(n, affinePoint) {
      if (!affinePoint && this.equals(_ExtendedPoint.BASE))
        affinePoint = Point.BASE;
      const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
      if (256 % W) {
        throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
      }
      let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
      if (!precomputes) {
        precomputes = this.precomputeWindow(W);
        if (affinePoint && W !== 1) {
          precomputes = _ExtendedPoint.normalizeZ(precomputes);
          pointPrecomputes.set(affinePoint, precomputes);
        }
      }
      let p = _ExtendedPoint.ZERO;
      let f = _ExtendedPoint.ZERO;
      const windows2 = 256 / W + 1;
      const windowSize = 2 ** (W - 1);
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window2 = 0; window2 < windows2; window2++) {
        const offset = window2 * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += 1n;
        }
        if (wbits === 0) {
          let pr = precomputes[offset];
          if (window2 % 2)
            pr = pr.negate();
          f = f.add(pr);
        } else {
          let cached = precomputes[offset + Math.abs(wbits) - 1];
          if (wbits < 0)
            cached = cached.negate();
          p = p.add(cached);
        }
      }
      return [p, f];
    }
    multiply(scalar, affinePoint) {
      const n = normalizeScalar(scalar);
      return _ExtendedPoint.normalizeZ(this.wNAF(n, affinePoint))[0];
    }
    toAffine(invZ = invert(this.z)) {
      const x = mod(this.x * invZ);
      const y = mod(this.y * invZ);
      return new Point(x, y);
    }
  };
  var ExtendedPoint = _ExtendedPoint;
  ExtendedPoint.BASE = new _ExtendedPoint(CURVE.Gx, CURVE.Gy, 1n, mod(CURVE.Gx * CURVE.Gy));
  ExtendedPoint.ZERO = new _ExtendedPoint(0n, 1n, 1n, 0n);
  var pointPrecomputes = new WeakMap();
  var _Point = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    static fromHex(hash) {
      const { d, P } = CURVE;
      const bytes = hash instanceof Uint8Array ? hash : hexToBytes(hash);
      if (bytes.length !== 32)
        throw new Error("Point.fromHex: expected 32 bytes");
      const last = bytes[31];
      const normedLast = last & ~128;
      const isLastByteOdd = (last & 128) !== 0;
      const normed = Uint8Array.from(Array.from(bytes.slice(0, 31)).concat(normedLast));
      const y = bytesToNumberLE(normed);
      if (y >= P)
        throw new Error("Point.fromHex expects hex <= Fp");
      const y2 = mod(y * y);
      const u = mod(y2 - 1n);
      const v = mod(d * y2 + 1n);
      let { isValid, value: x } = uvRatio(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & 1n) === 1n;
      if (isLastByteOdd !== isXOdd) {
        x = mod(-x);
      }
      return new _Point(x, y);
    }
    static async fromPrivateKey(privateKey) {
      const privBytes = await utils.sha512(normalizePrivateKey(privateKey));
      return _Point.BASE.multiply(encodePrivate(privBytes));
    }
    toRawBytes() {
      const hex = numberToHex(this.y);
      const u8 = new Uint8Array(B32);
      for (let i = hex.length - 2, j = 0; j < B32 && i >= 0; i -= 2, j++) {
        u8[j] = Number.parseInt(hex[i] + hex[i + 1], 16);
      }
      const mask = this.x & 1n ? 128 : 0;
      u8[B32 - 1] |= mask;
      return u8;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
    toX25519() {
      return mod((1n + this.y) * invert(1n - this.y));
    }
    equals(other) {
      return this.x === other.x && this.y === other.y;
    }
    negate() {
      return new _Point(mod(-this.x), this.y);
    }
    add(other) {
      return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
    }
    subtract(other) {
      return this.add(other.negate());
    }
    multiply(scalar) {
      return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
    }
  };
  var Point = _Point;
  Point.BASE = new _Point(CURVE.Gx, CURVE.Gy);
  Point.ZERO = new _Point(0n, 1n);
  var Signature = class {
    constructor(r, s) {
      this.r = r;
      this.s = s;
    }
    static fromHex(hex) {
      hex = ensureBytes(hex);
      const r = Point.fromHex(hex.slice(0, 32));
      const s = bytesToNumberLE(hex.slice(32));
      if (!isWithinCurveOrder(s))
        throw new Error("Signature.fromHex expects s <= CURVE.n");
      return new Signature(r, s);
    }
    toRawBytes() {
      const numberBytes = hexToBytes(numberToHex(this.s)).reverse();
      const sBytes = new Uint8Array(B32);
      sBytes.set(numberBytes);
      const res = new Uint8Array(B32 * 2);
      res.set(this.r.toRawBytes());
      res.set(sBytes, 32);
      return res;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  };
  function concatBytes(...arrays) {
    if (arrays.length === 1)
      return arrays[0];
    const length = arrays.reduce((a, arr) => a + arr.length, 0);
    const result = new Uint8Array(length);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const arr = arrays[i];
      result.set(arr, pad);
      pad += arr.length;
    }
    return result;
  }
  function bytesToHex(uint8a) {
    let hex = "";
    for (let i = 0; i < uint8a.length; i++) {
      hex += uint8a[i].toString(16).padStart(2, "0");
    }
    return hex;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string") {
      throw new TypeError("hexToBytes: expected string, got " + typeof hex);
    }
    if (hex.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex");
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
      const j = i * 2;
      array[i] = Number.parseInt(hex.slice(j, j + 2), 16);
    }
    return array;
  }
  function numberToHex(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
  }
  function numberToBytesPadded(num, length = B32) {
    const hex = numberToHex(num).padStart(length * 2, "0");
    return hexToBytes(hex).reverse();
  }
  function edIsNegative(num) {
    return (mod(num) & 1n) === 1n;
  }
  function bytesToNumberLE(uint8a) {
    let value = 0n;
    for (let i = 0; i < uint8a.length; i++) {
      value += BigInt(uint8a[i]) << 8n * BigInt(i);
    }
    return value;
  }
  function bytes255ToNumberLE(bytes) {
    return mod(bytesToNumberLE(bytes) & 2n ** 255n - 1n);
  }
  function mod(a, b = CURVE.P) {
    const res = a % b;
    return res >= 0n ? res : b + res;
  }
  function invert(number, modulo = CURVE.P) {
    if (number === 0n || modulo <= 0n) {
      throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    let a = mod(number, modulo);
    let b = modulo;
    let x = 0n, y = 1n, u = 1n, v = 0n;
    while (a !== 0n) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== 1n)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function invertBatch(nums, n = CURVE.P) {
    const len = nums.length;
    const scratch = new Array(len);
    let acc = 1n;
    for (let i = 0; i < len; i++) {
      if (nums[i] === 0n)
        continue;
      scratch[i] = acc;
      acc = mod(acc * nums[i], n);
    }
    acc = invert(acc, n);
    for (let i = len - 1; i >= 0; i--) {
      if (nums[i] === 0n)
        continue;
      let tmp = mod(acc * nums[i], n);
      nums[i] = mod(acc * scratch[i], n);
      acc = tmp;
    }
    return nums;
  }
  function pow2(x, power) {
    const { P } = CURVE;
    let res = x;
    while (power-- > 0n) {
      res *= res;
      res %= P;
    }
    return res;
  }
  function pow_2_252_3(x) {
    const { P } = CURVE;
    const x2 = x * x % P;
    const b2 = x2 * x % P;
    const b4 = pow2(b2, 2n) * b2 % P;
    const b5 = pow2(b4, 1n) * x % P;
    const b10 = pow2(b5, 5n) * b5 % P;
    const b20 = pow2(b10, 10n) * b10 % P;
    const b40 = pow2(b20, 20n) * b20 % P;
    const b80 = pow2(b40, 40n) * b40 % P;
    const b160 = pow2(b80, 80n) * b80 % P;
    const b240 = pow2(b160, 80n) * b80 % P;
    const b250 = pow2(b240, 10n) * b10 % P;
    const pow_p_5_8 = pow2(b250, 2n) * x % P;
    return pow_p_5_8;
  }
  function uvRatio(u, v) {
    const v3 = mod(v * v * v);
    const v7 = mod(v3 * v3 * v);
    let x = mod(u * v3 * pow_2_252_3(u * v7));
    const vx2 = mod(v * x * x);
    const root1 = x;
    const root2 = mod(x * SQRT_M1);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod(-u);
    const noRoot = vx2 === mod(-u * SQRT_M1);
    if (useRoot1)
      x = root1;
    if (useRoot2 || noRoot)
      x = root2;
    if (edIsNegative(x))
      x = mod(-x);
    return { isValid: useRoot1 || useRoot2, value: x };
  }
  function invertSqrt(number) {
    return uvRatio(1n, number);
  }
  async function sha512ToNumberLE(...args) {
    const messageArray = concatBytes(...args);
    const hash = await utils.sha512(messageArray);
    const value = bytesToNumberLE(hash);
    return mod(value, CURVE.n);
  }
  function keyPrefix(privateBytes) {
    return privateBytes.slice(B32);
  }
  function encodePrivate(privateBytes) {
    const last = B32 - 1;
    const head = privateBytes.slice(0, B32);
    head[0] &= 248;
    head[last] &= 127;
    head[last] |= 64;
    return mod(bytesToNumberLE(head), CURVE.n);
  }
  function equalBytes(b1, b2) {
    if (b1.length !== b2.length) {
      return false;
    }
    for (let i = 0; i < b1.length; i++) {
      if (b1[i] !== b2[i]) {
        return false;
      }
    }
    return true;
  }
  function ensureBytes(hash) {
    return hash instanceof Uint8Array ? hash : hexToBytes(hash);
  }
  function isWithinCurveOrder(num) {
    return 0 < num && num < CURVE.n;
  }
  function normalizePrivateKey(key) {
    let num;
    if (typeof key === "bigint" || typeof key === "number" && Number.isSafeInteger(key)) {
      num = BigInt(key);
      if (num < 0n || num > 2n ** 256n)
        throw new Error("Expected 32 bytes of private key");
      key = num.toString(16).padStart(B32 * 2, "0");
    }
    if (typeof key === "string") {
      if (key.length !== 64)
        throw new Error("Expected 32 bytes of private key");
      return hexToBytes(key);
    } else if (key instanceof Uint8Array) {
      if (key.length !== 32)
        throw new Error("Expected 32 bytes of private key");
      return key;
    } else {
      throw new TypeError("Expected valid private key");
    }
  }
  function normalizeScalar(num) {
    if (typeof num === "number" && num > 0 && Number.isSafeInteger(num))
      return BigInt(num);
    if (typeof num === "bigint" && isWithinCurveOrder(num))
      return num;
    throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
  }
  async function getPublicKey(privateKey) {
    const key = await Point.fromPrivateKey(privateKey);
    return typeof privateKey === "string" ? key.toHex() : key.toRawBytes();
  }
  async function sign(hash, privateKey) {
    const privBytes = await utils.sha512(normalizePrivateKey(privateKey));
    const p = encodePrivate(privBytes);
    const P = Point.BASE.multiply(p);
    const msg = ensureBytes(hash);
    const r = await sha512ToNumberLE(keyPrefix(privBytes), msg);
    const R = Point.BASE.multiply(r);
    const h = await sha512ToNumberLE(R.toRawBytes(), P.toRawBytes(), msg);
    const S = mod(r + h * p, CURVE.n);
    const sig = new Signature(R, S);
    return typeof hash === "string" ? sig.toHex() : sig.toRawBytes();
  }
  Point.BASE._setWindowSize(8);
  var crypto = (() => {
    const webCrypto = typeof self === "object" && "crypto" in self ? self.crypto : void 0;
    const nodeRequire = typeof module !== "undefined" && typeof __require === "function";
    return {
      node: void 0,
      web: webCrypto
    };
  })();
  var utils = {
    TORSION_SUBGROUP: [
      "0100000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
      "0000000000000000000000000000000000000000000000000000000000000080",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
      "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
    ],
    randomBytes: (bytesLength = 32) => {
      if (crypto.web) {
        return crypto.web.getRandomValues(new Uint8Array(bytesLength));
      } else if (crypto.node) {
        const { randomBytes } = crypto.node;
        return new Uint8Array(randomBytes(bytesLength).buffer);
      } else {
        throw new Error("The environment doesn't have randomBytes function");
      }
    },
    randomPrivateKey: () => {
      let i = 1024;
      while (i--) {
        const b32 = utils.randomBytes(32);
        const num = bytesToNumberLE(b32);
        if (num > 1n && num < CURVE.n)
          return b32;
      }
      throw new Error("Valid private key was not found in 1024 iterations. PRNG is broken");
    },
    sha512: async (message) => {
      if (crypto.web) {
        const buffer = await crypto.web.subtle.digest("SHA-512", message.buffer);
        return new Uint8Array(buffer);
      } else if (crypto.node) {
        return Uint8Array.from(crypto.node.createHash("sha512").update(message).digest());
      } else {
        throw new Error("The environment doesn't have sha512 function");
      }
    },
    precompute(windowSize = 8, point = Point.BASE) {
      const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
      cached._setWindowSize(windowSize);
      cached.multiply(1n);
      return cached;
    }
  };

  // deno:https://deno.land/x/base64@v0.2.1/base.ts
  function getLengths(b64) {
    const len = b64.length;
    let validLen = b64.indexOf("=");
    if (validLen === -1) {
      validLen = len;
    }
    const placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function init(lookup3, revLookup3, urlsafe = false) {
    function _byteLength(validLen, placeHoldersLen) {
      return Math.floor((validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen);
    }
    function tripletToBase64(num) {
      return lookup3[num >> 18 & 63] + lookup3[num >> 12 & 63] + lookup3[num >> 6 & 63] + lookup3[num & 63];
    }
    function encodeChunk(buf, start, end) {
      const out = new Array((end - start) / 3);
      for (let i = start, curTriplet = 0; i < end; i += 3) {
        out[curTriplet++] = tripletToBase64((buf[i] << 16) + (buf[i + 1] << 8) + buf[i + 2]);
      }
      return out.join("");
    }
    return {
      byteLength(b64) {
        return _byteLength.apply(null, getLengths(b64));
      },
      toUint8Array(b64) {
        const [validLen, placeHoldersLen] = getLengths(b64);
        const buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
        const len = placeHoldersLen ? validLen - 4 : validLen;
        let tmp;
        let curByte = 0;
        let i;
        for (i = 0; i < len; i += 4) {
          tmp = revLookup3[b64.charCodeAt(i)] << 18 | revLookup3[b64.charCodeAt(i + 1)] << 12 | revLookup3[b64.charCodeAt(i + 2)] << 6 | revLookup3[b64.charCodeAt(i + 3)];
          buf[curByte++] = tmp >> 16 & 255;
          buf[curByte++] = tmp >> 8 & 255;
          buf[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup3[b64.charCodeAt(i)] << 2 | revLookup3[b64.charCodeAt(i + 1)] >> 4;
          buf[curByte++] = tmp & 255;
        } else if (placeHoldersLen === 1) {
          tmp = revLookup3[b64.charCodeAt(i)] << 10 | revLookup3[b64.charCodeAt(i + 1)] << 4 | revLookup3[b64.charCodeAt(i + 2)] >> 2;
          buf[curByte++] = tmp >> 8 & 255;
          buf[curByte++] = tmp & 255;
        }
        return buf;
      },
      fromUint8Array(buf) {
        const maxChunkLength = 16383;
        const len = buf.length;
        const extraBytes = len % 3;
        const len2 = len - extraBytes;
        const parts = new Array(Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0));
        let curChunk = 0;
        let chunkEnd;
        for (let i = 0; i < len2; i += maxChunkLength) {
          chunkEnd = i + maxChunkLength;
          parts[curChunk++] = encodeChunk(buf, i, chunkEnd > len2 ? len2 : chunkEnd);
        }
        let tmp;
        if (extraBytes === 1) {
          tmp = buf[len2];
          parts[curChunk] = lookup3[tmp >> 2] + lookup3[tmp << 4 & 63];
          if (!urlsafe)
            parts[curChunk] += "==";
        } else if (extraBytes === 2) {
          tmp = buf[len2] << 8 | buf[len2 + 1] & 255;
          parts[curChunk] = lookup3[tmp >> 10] + lookup3[tmp >> 4 & 63] + lookup3[tmp << 2 & 63];
          if (!urlsafe)
            parts[curChunk] += "=";
        }
        return parts.join("");
      }
    };
  }

  // deno:https://deno.land/x/base64@v0.2.1/mod.ts
  var lookup = [];
  var revLookup = [];
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (let i = 0, l = code.length; i < l; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  var { byteLength, toUint8Array, fromUint8Array } = init(lookup, revLookup);

  // deno:https://deno.land/x/base64@v0.2.1/base64url.ts
  var lookup2 = [];
  var revLookup2 = [];
  var code2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  for (let i = 0, l = code2.length; i < l; ++i) {
    lookup2[i] = code2[i];
    revLookup2[code2.charCodeAt(i)] = i;
  }
  var { byteLength: byteLength2, toUint8Array: toUint8Array2, fromUint8Array: fromUint8Array2 } = init(lookup2, revLookup2, true);

  // deno:https://denopkg.com/chiefbiiko/std-encoding@v1.1.1/mod.ts
  var decoder = new TextDecoder();
  var encoder = new TextEncoder();
  function toHexString(buf) {
    return buf.reduce((hex, byte) => `${hex}${byte < 16 ? "0" : ""}${byte.toString(16)}`, "");
  }
  function fromHexString(hex) {
    const len = hex.length;
    if (len % 2 || !/^[0-9a-fA-F]+$/.test(hex)) {
      throw new TypeError("Invalid hex string.");
    }
    hex = hex.toLowerCase();
    const buf = new Uint8Array(Math.floor(len / 2));
    const end = len / 2;
    for (let i = 0; i < end; ++i) {
      buf[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return buf;
  }
  function decode(buf, encoding = "utf8") {
    if (/^utf-?8$/i.test(encoding)) {
      return decoder.decode(buf);
    } else if (/^base64$/i.test(encoding)) {
      return fromUint8Array(buf);
    } else if (/^base64url$/i.test(encoding)) {
      return fromUint8Array2(buf);
    } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
      return toHexString(buf);
    } else {
      throw new TypeError("Unsupported string encoding.");
    }
  }
  function encode(str, encoding = "utf8") {
    if (/^utf-?8$/i.test(encoding)) {
      return encoder.encode(str);
    } else if (/^base64(?:url)?$/i.test(encoding)) {
      return toUint8Array(str);
    } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
      return fromHexString(str);
    } else {
      throw new TypeError("Unsupported string encoding.");
    }
  }

  // deno:https://raw.githubusercontent.com/chiefbiiko/sha512/master/mod.ts
  var BYTES = 64;
  var SHA512 = class {
    constructor() {
      this.hashSize = BYTES;
      this._buffer = new Uint8Array(128);
      this._K = new Uint32Array([
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ]);
      this.init();
    }
    init() {
      this._H = new Uint32Array([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
      this._bufferIndex = 0;
      this._count = new Uint32Array(2);
      this._buffer.fill(0);
      this._finalized = false;
      return this;
    }
    update(msg, inputEncoding) {
      if (msg === null) {
        throw new TypeError("msg must be a string or Uint8Array.");
      } else if (typeof msg === "string") {
        msg = encode(msg, inputEncoding);
      }
      for (let i = 0; i < msg.length; i++) {
        this._buffer[this._bufferIndex++] = msg[i];
        if (this._bufferIndex === 128) {
          this.transform();
          this._bufferIndex = 0;
        }
      }
      let c = this._count;
      if ((c[0] += msg.length << 3) < msg.length << 3) {
        c[1]++;
      }
      c[1] += msg.length >>> 29;
      return this;
    }
    digest(outputEncoding) {
      if (this._finalized) {
        throw new Error("digest has already been called.");
      }
      this._finalized = true;
      var b = this._buffer, idx = this._bufferIndex;
      b[idx++] = 128;
      while (idx !== 112) {
        if (idx === 128) {
          this.transform();
          idx = 0;
        }
        b[idx++] = 0;
      }
      let c = this._count;
      b[112] = b[113] = b[114] = b[115] = b[116] = b[117] = b[118] = b[119] = 0;
      b[120] = c[1] >>> 24 & 255;
      b[121] = c[1] >>> 16 & 255;
      b[122] = c[1] >>> 8 & 255;
      b[123] = c[1] >>> 0 & 255;
      b[124] = c[0] >>> 24 & 255;
      b[125] = c[0] >>> 16 & 255;
      b[126] = c[0] >>> 8 & 255;
      b[127] = c[0] >>> 0 & 255;
      this.transform();
      let i, hash = new Uint8Array(64);
      for (i = 0; i < 16; i++) {
        hash[(i << 2) + 0] = this._H[i] >>> 24 & 255;
        hash[(i << 2) + 1] = this._H[i] >>> 16 & 255;
        hash[(i << 2) + 2] = this._H[i] >>> 8 & 255;
        hash[(i << 2) + 3] = this._H[i] & 255;
      }
      this.init();
      return outputEncoding ? decode(hash, outputEncoding) : hash;
    }
    transform() {
      let h = this._H, h0h = h[0], h0l = h[1], h1h = h[2], h1l = h[3], h2h = h[4], h2l = h[5], h3h = h[6], h3l = h[7], h4h = h[8], h4l = h[9], h5h = h[10], h5l = h[11], h6h = h[12], h6l = h[13], h7h = h[14], h7l = h[15];
      let ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
      let i, w = new Uint32Array(160);
      for (i = 0; i < 32; i++) {
        w[i] = this._buffer[(i << 2) + 3] | this._buffer[(i << 2) + 2] << 8 | this._buffer[(i << 2) + 1] << 16 | this._buffer[i << 2] << 24;
      }
      let gamma0xl, gamma0xh, gamma0l, gamma0h, gamma1xl, gamma1xh, gamma1l, gamma1h, wrl, wrh, wr7l, wr7h, wr16l, wr16h;
      for (i = 16; i < 80; i++) {
        gamma0xh = w[(i - 15) * 2];
        gamma0xl = w[(i - 15) * 2 + 1];
        gamma0h = (gamma0xl << 31 | gamma0xh >>> 1) ^ (gamma0xl << 24 | gamma0xh >>> 8) ^ gamma0xh >>> 7;
        gamma0l = (gamma0xh << 31 | gamma0xl >>> 1) ^ (gamma0xh << 24 | gamma0xl >>> 8) ^ (gamma0xh << 25 | gamma0xl >>> 7);
        gamma1xh = w[(i - 2) * 2];
        gamma1xl = w[(i - 2) * 2 + 1];
        gamma1h = (gamma1xl << 13 | gamma1xh >>> 19) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
        gamma1l = (gamma1xh << 13 | gamma1xl >>> 19) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xh << 26 | gamma1xl >>> 6);
        wr7h = w[(i - 7) * 2], wr7l = w[(i - 7) * 2 + 1], wr16h = w[(i - 16) * 2], wr16l = w[(i - 16) * 2 + 1];
        wrl = gamma0l + wr7l;
        wrh = gamma0h + wr7h + (wrl >>> 0 < gamma0l >>> 0 ? 1 : 0);
        wrl += gamma1l;
        wrh += gamma1h + (wrl >>> 0 < gamma1l >>> 0 ? 1 : 0);
        wrl += wr16l;
        wrh += wr16h + (wrl >>> 0 < wr16l >>> 0 ? 1 : 0);
        w[i * 2] = wrh;
        w[i * 2 + 1] = wrl;
      }
      let chl, chh, majl, majh, sig0l, sig0h, sig1l, sig1h, krl, krh, t1l, t1h, t2l, t2h;
      for (i = 0; i < 80; i++) {
        chh = eh & fh ^ ~eh & gh;
        chl = el & fl ^ ~el & gl;
        majh = ah & bh ^ ah & ch ^ bh & ch;
        majl = al & bl ^ al & cl ^ bl & cl;
        sig0h = (al << 4 | ah >>> 28) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
        sig0l = (ah << 4 | al >>> 28) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
        sig1h = (el << 18 | eh >>> 14) ^ (el << 14 | eh >>> 18) ^ (eh << 23 | el >>> 9);
        sig1l = (eh << 18 | el >>> 14) ^ (eh << 14 | el >>> 18) ^ (el << 23 | eh >>> 9);
        krh = this._K[i * 2];
        krl = this._K[i * 2 + 1];
        t1l = hl + sig1l;
        t1h = hh + sig1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
        t1l += chl;
        t1h += chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
        t1l += krl;
        t1h += krh + (t1l >>> 0 < krl >>> 0 ? 1 : 0);
        t1l = t1l + w[i * 2 + 1];
        t1h += w[i * 2] + (t1l >>> 0 < w[i * 2 + 1] >>> 0 ? 1 : 0);
        t2l = sig0l + majl;
        t2h = sig0h + majh + (t2l >>> 0 < sig0l >>> 0 ? 1 : 0);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        el = dl + t1l | 0;
        eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        al = t1l + t2l | 0;
        ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
      }
      h0l = h[1] = h0l + al | 0;
      h[0] = h0h + ah + (h0l >>> 0 < al >>> 0 ? 1 : 0) | 0;
      h1l = h[3] = h1l + bl | 0;
      h[2] = h1h + bh + (h1l >>> 0 < bl >>> 0 ? 1 : 0) | 0;
      h2l = h[5] = h2l + cl | 0;
      h[4] = h2h + ch + (h2l >>> 0 < cl >>> 0 ? 1 : 0) | 0;
      h3l = h[7] = h3l + dl | 0;
      h[6] = h3h + dh + (h3l >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      h4l = h[9] = h4l + el | 0;
      h[8] = h4h + eh + (h4l >>> 0 < el >>> 0 ? 1 : 0) | 0;
      h5l = h[11] = h5l + fl | 0;
      h[10] = h5h + fh + (h5l >>> 0 < fl >>> 0 ? 1 : 0) | 0;
      h6l = h[13] = h6l + gl | 0;
      h[12] = h6h + gh + (h6l >>> 0 < gl >>> 0 ? 1 : 0) | 0;
      h7l = h[15] = h7l + hl | 0;
      h[14] = h7h + hh + (h7l >>> 0 < hl >>> 0 ? 1 : 0) | 0;
    }
  };

  // deno:https://raw.githubusercontent.com/dimroc/noble-ed25519/main/mod.ts
  utils.sha512 = async (message) => {
    return new SHA512().update(message).digest();
  };

  // deno:file:///Users/droc/tmp/diffrepo/main/move.ts
  var textEncoder = new TextEncoder2();
  function asciiToHex(input) {
    return bufferToHex(textEncoder.encode(input));
  }
  function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // deno:file:///Users/droc/tmp/diffrepo/main/helpers.ts
  var textDecoder = new TextDecoder2();
  async function invokeScriptFunction(scriptFunction, typeArguments, args) {
    return await invokeScriptFunctionForContext(defaultUserContext, scriptFunction, typeArguments, args);
  }
  async function invokeScriptFunctionForContext(userContext, scriptFunction, typeArguments, args) {
    return await invokeScriptFunctionForAddress(userContext.address, await sequenceNumber(userContext.address), await userContext.readPrivateKey(), scriptFunction, typeArguments, args);
  }
  async function invokeScriptFunctionForAddress(senderAddressStr, sequenceNumber2, privateKeyBytes, scriptFunction, typeArguments, args) {
    const request = {
      "sender": senderAddressStr,
      "sequence_number": `${sequenceNumber2}`,
      "max_gas_amount": "1000000",
      "gas_unit_price": "0",
      "gas_currency_code": "XUS",
      "expiration_timestamp_secs": "99999999999",
      "payload": {
        "type": "script_function_payload",
        "function": scriptFunction,
        "type_arguments": typeArguments,
        "arguments": args.map((a) => a.encode())
      }
    };
    const signingMsgPayload = await createSigningMessage(request);
    const signingMsg = signingMsgPayload.message.slice(2);
    const publicKey = bufferToHex2(await getPublicKey(privateKeyBytes));
    const signature = await sign(signingMsg, privateKeyBytes);
    request.signature = {
      "type": "ed25519_signature",
      "public_key": publicKey,
      "signature": signature
    };
    return await submitTransaction(request);
  }
  function bufferToHex2(buffer) {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function hexToBytes2(hex) {
    if (hex.startsWith("0x")) {
      hex = hex.slice(2);
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i !== bytes.length; i++) {
      bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
  }
  function hexToAscii(hex) {
    const bytes = hexToBytes2(hex);
    return textDecoder.decode(bytes);
  }
  addEventListener("DOMContentLoaded", () => {
    console.log("even listened", arguments);
  });
  addEventListener("dimitri", () => {
    console.log("dimitri listened", arguments);
    console.log(invokeScriptFunctionForContext);
  });
})();
/*! noble-ed25519 - MIT License (c) Paul Miller (paulmillr.com) */
