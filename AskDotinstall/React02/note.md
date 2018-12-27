以下、記述したソースと問い合わせ内容です。<br>
（問い合わせ内容は「３」に記載しています。）<br>
<br>
動作確認は、Chromeで行いました。


## １．head に記述

#### ソース
[https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample01.html](https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample01.html)

#### 挙動
[https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample01.html](https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample01.html)

#### 内容
ドットインストール様にて記載されたサンプルソースを忠実に再現しました。


__________________________________


## ２．body 閉じ直前に記載（先頭）
#### ソース
[https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample02.html](https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample02.html)

#### 挙動
[https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample02.html](https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample02.html)

#### 内容
head に記載していた script タグの内容を、body 閉じタグ直前に持ってきたバージョン。<br>
元々 head 記載していた内容は、上段に記述している。<br>
こちらの記載はあまり推奨されない？

__________________________________


## ３．body 閉じ直前に記載（末尾）
#### ソース
[https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample03.html](https://github.com/kakisoft/TemporarySource/blob/master/AskDotinstall/React02/sample03.html)

#### 挙動
[https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample03.html](https://kakisoft.github.io/TemporarySource/AskDotinstall/React02/sample03.html)

#### 内容
head に記載していた script タグの内容を、body 閉じタグ直前に持ってきたバージョン。<br>
元々 head 記載していた内容を上段に記述している。<br>
babel を末尾に記述しているので、コンパイルエラーが発生する・・・かと思いきや、正常に動いている。<br>
エラーも特に発生していない。<br>
どういう原理？<br>
ちなみに、ローカルで実行した時も同様。<br>

__________________________________






