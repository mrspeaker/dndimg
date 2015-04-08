# dndimg

![dndimg](https://cloud.githubusercontent.com/assets/129330/7045413/e8a2b00c-ddcb-11e4-8736-4f5112d57884.png)

Drag and drop image, uploads to ImgUr and copies link to clipboard.

## Using

It's a nw (node webkit) project. Will package it properly soon. For now, use

  > nw .

in the root directory to run it. But you need a...

## Client Id

I don't understand OAuth2 yet, so not sure if I'm supposed to keep the client_id a secret. Obviously if I package this as an actual app it will be trivial to reverse... so, dunno. But for now, I'm hiding it by not commiting `src/imgur_client_id.js`. It looks like this though:

    export default "1234567abcde";

No need for a secret key, as anonymous uploads don't need it.
