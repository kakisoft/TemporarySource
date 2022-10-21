【Laravel】Redis ライブラリは、PhpRedis が推奨されているが、Predis を採用した方がいい場面も多いのでは？
Laravel - PhpRedis is recommended by Redis library, but aren't there a lot of situations where it's better to use Predis?

phpredis-vs-predis

____________________________________________________________

**Environment**
MySQL version : 5.7  
Laravel version : 8.16.1  
PHP version : 7.4.7  


## Laravel で Redis を使う時のライブラリ
## The library when you use Redis with Laravel
Laravel で Redis を使う時、PHP のライブラリに以下の２つの候補が出てきます。  
There are 2 PHP libraries when you use Redis in Laravel.

 * [Predis](https://github.com/predis/predis)
 * [PhpRedis](https://github.com/phpredis/phpredis)

デフォルトだと、composer.lock に「predis」が記述されています。  
By default, composer.lock contains "predis".  


### composer.lock
```php
    "packages": [
        {
            "require-dev": {
                "predis/predis": "^1.1.2",
                "symfony/cache": "^5.1.4"
            },
```

database.php で指定している phpredis は、別途 phpredis をインストールしなければ、使う事ができない。※phpredis は、composer でインストールできない

phpredis specified in database.php cannot be used unless phpredis is installed separately.  
cf.
phpredis couldn't be installed by composer.



### config\database.php
```php
    'redis' => [
        'client' => env('REDIS_CLIENT', 'phpredis'),
```

composer.lock にて指定している predis は、使用されていない。（デフォルトの設定では）  
"predis" is not used which is contained in composer.lock.(By default config)  

database.php で指定している phpredis は、別途 phpredis をインストールしなければ、使う事ができない。  
It is necessary to install "phpredis" separately, which is contained in database.php.  

何なんだこの中途半端な状態は。  
What is this contradiction?  

疑問に思って調べてみると、predis はデフォルトから外される予定だったけど、やっぱ外すのやめたーって事になり、とはいっても phpredis を推奨したいし・・・  
といった感じで、どっちつかずの状態になっているようです。（推測）  

I wondered about it and looked it up.  
It seems like predis was supposed to be removed from the default, but it has been reconsider.  
However, they would like to suggest to use phpredis...  

It seems that they are still in confusion.(maybe)  


## どちらを採用するべき？
## Which should we adapt?
どちらを使えばいいのかについては議論が活発なようで、こんなのがありました。  
There seems to be a lot of debate about which one to use, and here's what I found.  

[PHP向けRedisクライアントのpredisを使うのは止めた方がいいです](https://yoshinorin.net/2019/08/28/predis-not-maintain/)  
You should not use predis, the Redis client for PHP  

> predisはPHP向けのRedisクライアントです。  
> predis is a Redis client for PHP.  
>
> リポジトリを見て察しのいい方は気づいたと思うのですが、2年ぐらいメンテ（コミットすら）されていません。  
> If you have a good guess and check their repository, you'll notice that it hasn't been updated (even committed) for about two years.  
>
> すでにPHP7.3周りで問題が出てます。これが「どういった事情でメンテされていないのか？」「されないのではなく、できないのか？」などは誰もわからないと思いますし、もしかしたら将来的に再度メンテされる可能性はありえます。  
> There is already a problem from PHP7.3. I don't think anyone knows "Why is this not being updated?"  


現在はどうなっているのか気になって調べてみたところ、2022年 9月現在は、無事開発は再開され、活発に活動されています。  
I looked up current situation, and as of September 2022, development has resumed and is active.  
https://github.com/predis/predis/pulse  

そのため、開発ストップによる懸念事項は無いものと考えて良さそうです。  
Therefore, there is no concern due to development stoppage.  

> Laravelのドキュメントにも書いてありますが、phpredis使えばいいと思います。  
> It is also stated in the Laravel documentation, but I think you should use phpredis.
>
> こちらはcomposerでインストールできない（PHP拡張モジュールなので）のでpeclでインストールします。
> This can not be installed with composer (because it is a PHP extension module), so install it with pecl.

いやああああ！！！  
Nooooooo!!!!!  
マジなの？　令和にもなって、PHPライブラリを composer でインストールできないとか正気なの？？  
Are you serious? We're not in the Stone Age now!  

さすがに今では改善されているんじゃ・・・と思って公式サイトの PhpRedis 公式のインストールガイドを見てみた。  
As expected, I thought that it was fixed now, so I looked at the official PhpRedis installation guide on the official website.  
が、pecl を使えという夢も希望も無いメッセージが。  
But, there is a message without a dream or hope to use pecl.  

[https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown](https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown)  

こんなのもあった。  
I found also this.  
[How to install phpredis using composer?](https://github.com/phpredis/phpredis/issues/745)  

> I need to install phpredis using composer on windows server running IIS. What is the package name for this?
>
> You cannot.
> Composer is for pure-PHP library not for C extension (pickle will do it later)
>
>  You need to compile it! See more information here: 

どうやら composer でインストールするのは絶望的で、今後もできるようになる可能性は限りなくゼロに近そう。  
Apparently it is impossible to install with composer, and the possibility of being able to do it in the future seems to be close to zero.  

念のため、他の記事も参考にしてみた。  
Just in case, I checked other articles as well.  
[Laravel 8のRedisクライアントのパフォーマンスの比較](https://tdomy.com/2020/11/redis-client-comparison/)  
Laravel 8 Redis client performance comparison  

性能比較をして、PhpRedis の方が上だった模様。  
It seems that PhpRedis was better in performance comparison.  

> 上記のコマンドをそれぞれ50回実行し、平均（±標準偏差）を算出しました。  
>
> * PhpRedis … 1.317 ± 0.03 (秒)  
> * Predis … 1.509 ± 0.026 (秒)  
>
> Predisを使用した場合の処理時間はPhpRedisの場合の約1割増しと、明らかに差がでました  
>
> Laravel 8 でPhpRedisとPredisを比較しました。PhpRedisの方が普通に速いので、導入できる環境であれば、Laravelの推奨に従ってPhpRedisで良さそうです。

> I executed each command 50 times, and calculate average and standard deviation.
>
> * PhpRedis ... 1.317 ± 0.03(secs)  
> * Predis ... 1.509 ± 0.026(secs)  
>
> The processing time when using Predis is about 10% longer than PhpRedis, which shows a clear difference.  
>
> I compared PhpRedis and Predis in Laravel 8. PhpRedis is usually faster, so if it is an environment that can be introduced, PhpRedis seems to be good according to Laravel's recommendation.

でも composer で管理できないのは嫌だ。  
But I hate not being able to manage it with composer.  

[PhpRedis vs Predis: Comparison on real production data](https://akalongman.medium.com/phpredis-vs-predis-comparison-on-real-production-data-a819b48cbadb)

> PhpRedis is faster about x6 times. Using igbinary serializer reduces stored data size about 3x times.  
>
> If Redis installed on separate machines, reducing network traffic is a very significant speedup.  

ここでも PhpRedis を絶賛。  
PhpRedis is also praised here.  


以下、Laravel公式の見解。  
Here is Laravel official statement.
[Redis 8.x Laravel](https://readouble.com/laravel/8.x/ja/redis.html)
> LaravelでRedisを使い始める前に、PECLにより phpredis HP拡張機能をインストールして使用することを推奨します。

[Redis 8.x Laravel](https://readouble.com/laravel/8.x/en/redis.html)  
> Before using Redis with Laravel, we encourage you to install and use the phpredis PHP extension via PECL. 

これはもう phpredis で確定か。  
Many developers highly recommended phpredis.  


## PhpRedis のインストール
## How to install PhpRedis

### インストールコマンド
### install command
ディストリビューションは Debian と Alpine で試してみました。  
I have tried Debian and Alpine distributions.  
```
pecl install redis
```

以下のようなエラーが出た場合は、次に紹介するコマンドを先に実行してみてください。  
If you get an error as below, try the following commands before.  
```
/application # pecl install redis
downloading redis-5.3.4.tgz ...
Starting to download redis-5.3.4.tgz (268,154 bytes)
........................................................done: 268,154 bytes
29 source files, building
running: phpize
Configuring for:
PHP Api Version:         20190902
Zend Module Api No:      20190902
Zend Extension Api No:   320190902
Cannot find autoconf. Please check your autoconf installation and the
$PHP_AUTOCONF environment variable. Then, rerun this script.

ERROR: `phpize' failed
```

上記のエラーが出た時に実行するコマンド  
Command to run when the above error occurs  
```
apk add --no-cache \
        $PHPIZE_DEPS \
        openssl-dev
```

### Dockerfile に記述する場合
### When writing in Dockerfile
```Dockerfile
FROM php:7.4.11-fpm

# 中略
# omission

RUN git clone https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis
RUN docker-php-ext-install redis
```

### インストールチェック
### Installation check
以下のコマンドにて確認可能です。  
You can check whether PhpRedis is installed correctly with the following command.  
```
php -m | grep redis
```
以下のメッセージが表示された場合、PhpRedis は正常にインストールされています。  
If you see the following message, PhpRedis has been successfully installed.  
```
redis
```


## Redis コンテナの設定
## Redis container configuration

### docker-compose.yml
```yml
version: '3'
services:

# 中略
# omission

  redis:
    image: "redis:6.0"
    container_name: redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - "./data/redis:/data"
```

## Laravel の設定
## Laravel configuration

### .env
```
CACHE_DRIVER=redis

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### config\database.php
```php
    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),
```

アプリ実行前に、以下のコマンドでキャッシュをクリア。  
Before running the app, clear the cache with the following command.  
```
php artisan config:clear
```

## 実験用ソース
## Sample sources
以下のような超適当なコードを書いて実験してみました。  
I have written the following code to try it.  

### routes\web.php
```php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

//============================================================================================
//                                       Cache
//============================================================================================
// http://localhost:8000/cache/put
Route::get('/cache/put', function () {
    echo "put";

    // キャッシュに値を保存
    // store value in cache
    Cache::put('key01', 'value01');
});

// http://localhost:8000/cache/remember
Route::get('/cache/remember', function () {
    echo "remember";

    // 値を恒久的に保存する
    // store value permanently
    $cache = \Cache::remember('key02', 10, function(){
        return "value02_remember";
    });

    dump($cache);
});

// http://localhost:8000/cache/get
Route::get('/cache/get', function () {
    echo "get";

    // キャッシュからアイテム一つを取得する
    // get one value from cache
    $cache01 = Cache::get('key01');
    $cache02 = Cache::get('key02');

    dump($cache01);
    dump($cache02);
});

// http://localhost:8000/cache/forget
Route::get('/cache/forget', function () {
    echo "forget";

    // キャッシュからアイテムを消去
    // remove value from cache
    Cache::forget('key01');
    Cache::forget('key02');
});
```

無事、Redis を動作させる事が出来ました。  
I was able to successfully get Redis to work.  


## その他注意事項
## caution
pecl install redis コマンドにてインストールした後、以下のメッセージが表示されました。  
After installing with command pecl install redis, the following message was displayed.  

> You should add "extension=redis.so" to  

との事ですが、別に追記せずとも動きました。  
However, it worked without adding it.
詳細は私も良く分かってないのですが、Laravel が気を利かせて、勝手に読み込んでくれているのかもしれません。  
I have no idea about the details, but I guess Laravel take care of it and read it on its own.  

と思いきや、こんなのも見つかりました。  
As I thought, I also found this.  

[Laravel Redisのライブラリをインストールしたらエラーが発生した](https://qiita.com/miriwo/items/d6ad9e0edc422e8a363a)  
An error occurred when installing laravel redis library  

こちらでは、  
『エラーが出たけど、php.ini「extension="redis.so」をコメントアウトしたら直った。』  
といった内容が書かれています。  

The content says,  
"I got an error, but I fixed it by commenting out php.ini "extension="redis.so". 』  

という事は、Laravel を使う場合は、この設定は不要なのかもしれません。  
So, when you use Laravel, this setting may not be necessary.  

ただ、別の環境にアップする時にはエラーが発生するケースがあるようです。  
However, there seems to be a case where an error occurs when uploading to another environment.  
[AWSにLaravelをデプロイしたらエラーが出たときの対応方法](https://qiita.com/freeneer/items/8162c562337e304b4417)  
How to solve an error when deploying Laravel to AWS  

EC2 にアップすると動かなかったので、php.ini に extension=redis.so を追記しているようです。  
It seems that extension=redis.so is added to php.ini to make it work in EC2.

「本番環境では動かない！」という場合のため、こんな現象が発生するケースがあるという事を記憶に留めておいた方がよさそうです。  
It seems better to keep in mind that there are cases where such an error occurs, just in case "It does not work in the production environment!"  

おそらく Amazon Linux（RedHat系）を使っているのも、考えられる原因の１つでしょうか。  
Maybe, using Amazon Linux(RedHat distribution) is one of the causes.  
後で試してみたのですが、Debian では特に問題なく動作できました。  
I tried it later and it worked just fine on Debian.  


### php.ini に extension=redis.so を追記
### How to add "extension=redis.so" to php.ini
まずは php.ini のパスを確認。  
以下、コマンド。
First, check the path of php.ini.  
Below is the command.  
```
php -i | grep php.ini
```
実行結果例  
Execution result example  
```
/application $ php -i | grep php.ini
Configuration File (php.ini) Path => /usr/local/etc/php
Loaded Configuration File => /usr/local/etc/php/php.ini
```

上記では、保存パスが「/usr/local/etc/php/php.ini」だったので、追記パスは以下。
In the above, the saved path was "/usr/local/etc/php/php.ini", so the additional path is as follows.  
```
echo "extension=redis.so" >> /usr/local/etc/php/php.ini
```
追記後は php.ini の内容を確認。  
After adding it, check the contents of php.ini.  

その後、再起動。  
Then reboot.  



## Predis を使う場合
## case of Predis
## How to install Predis
こちらも試してみました。  
I also tried it.  

composer でインストールができるので、PhpRedis よりも遥かに楽です。  
It can be installed with composer, so it's much easier than PhpRedis.  

詳細は公式サイトを。  
For more details, read the official website.  
[https://readouble.com/laravel/8.x/ja/redis.html](https://readouble.com/laravel/8.x/ja/redis.html)

以下、実行コマンドです。  
Execution command is here.  
```
composer require predis/predis
```

.env や config を正しく設定できていれば、すんなり行くのではないかと思います。  
If .env and config are set correctly, I think it works without any problem.  


## Laravel の設定
## Laravel configuration

### config\database.php
```php
    'redis' => [

        'client' => env('REDIS_CLIENT', 'predis'),
```

それ以外の設定や、実験にて使用したコードは上記と共通です。  
Other settings and the code used in the experiment are the same as above.  

ディストリビューションによる差異を受けないので、想定外の事に遭遇する事も無く、心に余裕ができます。  
Since there is no difference due to distribution, you will not encounter unexpected issue, and you will have peace in your mind.  

______________________________________________________________________________________________________________________________
## 採用選定基準についての所管
## ライブラリ選択基準についての所管
## perspective of library selection
PhpRedis 速い！ PhpRedis 最高！　絶対 PhpRedis にするべき！  
みたいな意見もちらほら見かけるけど、パッケージマネージャーによる管理ができず、ハードに近い部分に手を加えなければいけないので気を回す部分が増えます。  

Same engineers say that "PhpRedis is fast! PhpRedis is the best! You should definitely use PhpRedis!"  
But, it cannot be managed by a package manager, and since it is necessary to modify parts close to hardware, there are many things to take account.

結果として、環境構築の難易度が上がったり通常運用時に不測の事態が発生する可能性が上がったりするので、いっそ Predis を選択するのもアリなのでは？  
というのが個人的な意見。  
At the end of time, the difficulty of the building an environment may be complicated, it increases the possibility of unexpected errors during regular work.
In my opinion, then Predis is a good choice.


Predis 開発の中断が懸念事項に上がってけど、少なくとも現在は再開しているし、composer で管理できるし、色々メリットはある。  
I found an article talking about the concern which Predis development had been suspended, but now development has resumed.
It can be managed by composer and has many advantages.


性能は PhpRedis の方が上だけど、システムによってはキャッシュへのアクセスがそこまで頻繁に起こらないケースもあるだろうし、そこまで厳しいアクセススピードの性能が求められないなら、管理コストを下げられるライブラリを選ぶ、というのも１つの選定基準だと思う。  
PhpRedis has better performance, but depending on system, there are cases where access to the cache does not happen so frequently.
If you don't need such a strict access speed performance, I think one of the selection criteria is to choose a library that can reduce management costs.

------
少なくとも自分は、上記のような理由で PhpRedis ではなく Predis を採用する責任者が居たとしても何ら疑問はないし、その意見に反対するつもりも無い。  
At least I have no doubts and do not object to the opinion that there are developers responsible for adopting Predis over PhpRedis for the above reasons.
------

ちなみに自分は  
「高速化と軽量化は常に正義！（たとえフロント側のパフォーマンスが厳しく求められないアプリケーションでも。技術負債を抱えてでも実施するべき！）」  
という意見には否定的です。  
By the way, I am not agree with such an idea.
"Faster and lighter is always right! (Even if the application does not require high front-end performance. It should be implemented even if you have technical debt!)


composer で管理できない以上、Docker イメージを作り直す必要があるし、EC2 のような仮想サーバで動かす事を想定するならディストリビューションごとにインストールコマンド用意したりする必要があったりと、ややこしい作業が増えるし。
Since you can't manage it with composer, you need to recreate the Docker image.
And also, If you are planning to use it in virtual server such as EC2, it will be necessary to prepare an installation command for each distribution, and the number of complicated works will increase.



## まとめ
## summary

 * Laravel で Redis を使う場合、２種類のライブラリのうち、どちらかを採用する。「Predis」か「PhpRedis」
 * 昔は Predis が使われていたが、現在では PhpRedis が推奨されている。（公式でさえ）
 * PhpRedis は composer で管理できず、pecl でインストールする必要がある
 * そのため、コンテナを使っている場合、イメージを作り替える必要がある
 * php.ini に "extension=redis.so" の追記が必要かもしれないけど、無くても動く。ただし環境によるかも。

 * When using Redis in Laravel, you will need to adopt one of two types of libraries. "Predis" or "PhpRedis"
 * Previously, Predis was commonly used, but now PhpRedis is recommended. (even in official website)
 * PhpRedis cannot be managed by composer and must be installed by pecl.
 * Therefore, if you are using containers, you need to rebuild the image.
 * You may need to add "extension=redis.so" to php.ini, but it may work without it depend on the environment.


「キャッシュドライバを使うだけで、何でこんなに苦労を・・・？　このシステムではフロントは大して重要じゃないのに」と思った方は、是非 Predis の採用を検討してみてください。
If you think that "Why am I having such a hard time just using the cache driver...?  The front end is not important in this system",
I recommend consider adopting Predis.



## おまけ
## Extra
ある日、何をやってもブラウザに「500 エラー」としか出なくなってたので、laravel.log を見たら、こんなの出てた。  
One day, I got a "500 error" no matter what I did.
So I looked in laravel.log and found such a message.

```
local.ERROR: Please make sure the PHP Redis extension is installed and enabled. 
{"exception":"[object] (LogicException(code: 0): Please make sure the PHP Redis extension is installed and enabled. 
at /var/www/html/my-laravel-app/vendor/laravel/framework/src/Illuminate/Redis/Connectors/PhpRedisConnector.php:77)
```

あれ？　特に何も触ってないのに？  
と思いきや、.env を弄ってて、環境設定ファイルが読み込みエラーになってたのが原因だった。（Redis と全く関係無い部分）  
Why? I didn't edit about redis configuration?  
I wondered and looked into it, and it was caused by an error in reading the environment setting file due to editing .env.(The Parts that have nothing to do with Redis)


それ以外の全てのエラーを優先して前面に出て来るとは、なかなか主張が強いな・・・  
It's quite assertive that redis error is prioritized from all other errors and come to front...


______


Shiba Inu

Solana


since
なので

because
なので


since - 周知の事実なので


take account
気を配る


occur
起きてる出来事に対して、ネガティブ感が出る

happen
ニュートラル


error occurs
cache does not happen so frequently

regular work


criteria - 基準
criterion

technical debt
