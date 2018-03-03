/*
TypeScript：Version 2.7.2
Node.js：v8.6.0

（ビルドコマンド）
tsc practice_typescript02.ts -t ES5 --out bundled-practice_typescript02.js

（実行コマンド）
node bundled-practice_typescript02.js
*/
/*
-----( ドットインストール質問事項 )-----
内部モジュールに「module UserModule」を定義し、
外部モジュールに「module DeveloperModule」を定義すると、
ビルドエラーが発生しました。

これらは１つのファイルに共存させる事ができないのでしょうか。
（どちらか１つをコメントアウトすると、ビルドが通る。）
*/
var UserModule;
(function (UserModule) {
    UserModule.name = "yamada";
})(UserModule || (UserModule = {}));
console.log(UserModule.name);
/// <reference path="./developers.ts" />
console.log(DeveloperModule.name);
