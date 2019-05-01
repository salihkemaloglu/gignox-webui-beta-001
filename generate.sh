#!/bin/bash
#ömer
protoc --plugin="protoc-gen-ts=C:\Users\partnera\Desktop\myProject\gignox-web-beta-001\node_modules\.bin\protoc-gen-ts.cmd" --ts_out="service=true:./src" --js_out="import_style=commonjs,binary:./src"  proto/gigxRR.proto
#salih
protoc --plugin="protoc-gen-ts=C:\Users\welat\Desktop\MyProject\gignox-web-beta-001\node_modules\.bin\protoc-gen-ts.cmd" --ts_out="service=true:./src" --js_out="import_style=commonjs,binary:./src"  proto/gigxRR.proto

