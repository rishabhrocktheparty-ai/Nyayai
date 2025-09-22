import crypto from "crypto";

// Accept common binary inputs (Buffer works; we coerce to Uint8Array for typing)
export function sha256FromBuffer(input: Uint8Array | ArrayBuffer | string | Buffer) {
  let data: string | Uint8Array;
  if (typeof input === "string") {
    data = input;
  } else if (input instanceof Uint8Array) {
    // Normalize to a Uint8Array slice to avoid Buffer typing issues
    data = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  } else {
    data = new Uint8Array(input as ArrayBuffer);
  }
  return crypto.createHash("sha256").update(data).digest("hex");
}
