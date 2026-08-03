import base64

_original_b64decode = base64.b64decode

def _padded_b64decode(value, *args, **kwargs):
    if isinstance(value, str):
        value = ''.join(value.split())
        value += '=' * (-len(value) % 4)
    elif isinstance(value, (bytes, bytearray)):
        value = b''.join(value.split())
        value += b'=' * (-len(value) % 4)
    return _original_b64decode(value, *args, **kwargs)

base64.b64decode = _padded_b64decode
