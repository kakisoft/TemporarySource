var DeveloperModule;
(function (DeveloperModule) {
    DeveloperModule.name = "kaki"; //exportを付けると、外部からアクセスできる
    var AddressModule;
    (function (AddressModule) {
        AddressModule.zip = "222-2222";
    })(AddressModule = DeveloperModule.AddressModule || (DeveloperModule.AddressModule = {}));
})(DeveloperModule || (DeveloperModule = {}));
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
//==================================
//         内部モジュール
//==================================
/*
//-------<↓↓ UserModuleと併用するとエラーが発生する ↓↓>-------
module UserModule {
    export var name = "yamada"; //exportを付けると、外部からアクセスできる
    export module AddressModule { //入れ子にする事もできる
        export var zip = "111-1111";
    }
}

console.log(UserModule.name);
console.log(UserModule.AddressModule.zip);

import addr = UserModule.AddressModule; //エイリアス。（UserModule.Address<odule を addr でコールできるようにする）
console.log(addr.zip);
//-------<↑↑ここまで↑↑>-------
*/
//-----< 別ファイルからコール >-----
//★↓のように、スラッシュを３つ付けたコメントの後に、importするモジュールを指定する。（同時にコンパイルする）
/// <reference path="./modules/developers.ts" />
console.log(DeveloperModule.name);
console.log(DeveloperModule.AddressModule.zip);
var devaddr = DeveloperModule.AddressModule;
console.log(devaddr.zip);
