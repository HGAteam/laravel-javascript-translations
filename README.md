## Traduzca su código javascript en laravel

**Para comenzar necesitas tener un proyecto creado o debes seguír los siguientes pasos.**

####Paso 1 
La primer manera de crear un proyecto laravel es desde powershell ingresando el siguiente código.

```shell
composer create-project laravel/laravel:^9.0 example-app
```
La segunda manera de crear un proyecto laravel tambien desde powershell, es instalando laravel de forma global, ésto agilizara la creación de futuros proyectos

```shell
composer global require laravel/installer
```
para instalar con ésta segunda opción podrás simplemente colocar 
```shell
laravel new example-app
```
####Paso 2 
Cuando ya tienes tu proyecto configurado y funcionando lo que debes hacer es crear un Middleware de la siguiente manera:
```shell
php artisan make:middleware LangMiddleware
```
Esto crea un middleware para los idiomas en la ruta **app/Http/Middleware/LangMiddleware.php** donde deberás agregar las siguientes lineas:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LangMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
        }
        return $next($request);
    }
}
```
####Paso 3
Una vez que hayas creado el Middleware para los lenguajes deberas agregarlo al archivo **app/Http/Kernel.php**

```php
    protected $middlewareGroups = [
        'web' => [
           ...
            \App\Http\Middleware\LangMiddelware::class,
			...
        ],

```
####Paso 4
Cuando ya se encuentra agregado al archivo kernel procedemos a ingresar en la ruta **routes/web.php** y agregar 2 rutas
```php
...
/**
* Ruta que se encarga de cambiar el idioma de la etiqueta <html lang="*">
* Desde función de idioma php (por lo general desd navbar dropdown language)
* */
Route::get('/language/{locale}', function ($locale) {
    app()->setLocale($locale);
    session()->put('locale', $locale);
    return redirect()->back();
});

/**
* Ruta que se encarga pasar el archivo *.json a javscript 
* Funciona en conjunto con la primer ruta ya que define el idioma de la etiqueta <html lang="*">
**/
Route::get('/translations/{locale}', function ($locale) {
    $path = resource_path("lang/{$locale}.json");
    return response()->file($path);
});
...
```
####Paso 5
En la vista que contiene el navbar donde se encuentra un dropdown para el lenguaje debemos colocar algo similar al código de ejemplo que dejo a continuación. No debe ser igual.

```php
<li class="nav-item dropdown nav-item-left-border d-none d-sm-block nav-item-left-border-remove nav-item-left-border-md-show">
                                        @if (config('app.locale') == 'en')
                                            <a class="nav-link" href="javascript:void(0)" role="button"
                                                id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <img src="{{ asset('template/img/blank.gif') }}" class="flag flag-gb"
                                                    alt="{{ __('English')}}" /> {{ __('English') }}
                                                <i class="fas fa-angle-down"></i>
                                            </a>
                                        @else
                                            <a class="nav-link" href="javascript:void(0)" role="button"
                                                id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <img src="{{ asset('template/img/blank.gif') }}" class="flag flag-es"
                                                    alt="{{ __('Spanish')}}" /> {{ __('Spanish') }}
                                                <i class="fas fa-angle-down"></i>
                                            </a>
                                        @endif

                                        @if (config('app.locale') == 'en')
                                            <div class="dropdown-menu" aria-labelledby="dropdownLanguage">
                                                <a class="dropdown-item" disabled href="/language/en"><img
                                                        src="{{ asset('template/img/blank.gif') }}" class="flag flag-gb"
                                                        alt="{{ __('English') }}" /> {{ __('English') }}</a>
                                                <a class="dropdown-item" href="/language/es"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-es" alt="{{ __('Español') }}" /> {{ __('Español') }}</a>

                                            </div>
                                        @else
                                            <div class="dropdown-menu" aria-labelledby="dropdownLanguage">
                                                <a class="dropdown-item" href="/language/es"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-es" alt="Español" /> {{ __('Español') }}</a>
                                                <a class="dropdown-item" href="/language/en"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-gb" alt="English" /> {{ __('English') }}</a>

                                            </div>
                                        @endif

                                    </li>
```
Esto hara uso de la primera ruta de lenguaje solo cambiara el idioma de php y no de javascript.

####Paso 6
Ahora incluiremos el script de traducciones para javascript, puede incluirse en el body o donde coloque tus archivos.js
```php
<script src="{{asset('laravel-translator.js')}}"></script>
```
####Paso 7
Una vez que ya tengas agregado el script podrás utilizarlo en cualquier texto que desees traducir de javascript por ejemplo en un archivo externo .js podrias llamar a la traducción de la siguiente forma.

```javascript
alert(lang.t('alerta de prueba'));
```

------------
## Translate your javascript code in laravel

**To get started you need to have a project created or you must follow the steps below.**

####Step 1 
The first way to create a laravel project is from powershell, entering the following code..

```shell
composer create-project laravel/laravel:^9.0 example-app
```
The second way to create a laravel project also from powershell, is to install laravel globally, this will speed up the creation of future projects.

```shell
composer global require laravel/installer
```
to install with this second option you can simply place 
```shell
laravel new example-app
```
####Step 2 
When you have your project configured and running what you have to do is to create a Middleware as follows:
```shell
php artisan make:middleware LangMiddleware
```
This creates a middleware for the languages in the path **app/Http/Middleware/LangMiddleware.php** where you should add the following lines:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LangMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Session::has('locale')) {
            App::setLocale(Session::get('locale'));
        }
        return $next($request);
    }
}
```
####Step 3
Once you have created the Middleware for the languages you must add it to the **app/Http/Kernel.php** file.

```php
    protected $middlewareGroups = [
        'web' => [
           ...
            \App\Http\Middleware\LangMiddelware::class,
			...
        ],

```
####Step 4
When it is already added to the kernel file we proceed to enter the path **routes/web.php** and add 2 routes
```php
...
/**
* Path that is responsible for changing the language of the <html lang="*"> tag.
* From php language function (usually from navbar dropdown language)
* */
Route::get('/language/{locale}', function ($locale) {
    app()->setLocale($locale);
    session()->put('locale', $locale);
    return redirect()->back();
});

/**
* Path which is in charge of passing the *.json file to javscript 
* Works in conjunction with the first path as it defines the language of the <html lang="*"> tag.
**/
Route::get('/translations/{locale}', function ($locale) {
    $path = resource_path("lang/{$locale}.json");
    return response()->file($path);
});
...
```
####Step 5
In the view that contains the navbar where there is a dropdown for the language we must place something similar to the code of example that I leave next. It should not be the same.

```php
<li class="nav-item dropdown nav-item-left-border d-none d-sm-block nav-item-left-border-remove nav-item-left-border-md-show">
                                        @if (config('app.locale') == 'en')
                                            <a class="nav-link" href="javascript:void(0)" role="button"
                                                id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <img src="{{ asset('template/img/blank.gif') }}" class="flag flag-gb"
                                                    alt="{{ __('English')}}" /> {{ __('English') }}
                                                <i class="fas fa-angle-down"></i>
                                            </a>
                                        @else
                                            <a class="nav-link" href="javascript:void(0)" role="button"
                                                id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <img src="{{ asset('template/img/blank.gif') }}" class="flag flag-es"
                                                    alt="{{ __('Spanish')}}" /> {{ __('Spanish') }}
                                                <i class="fas fa-angle-down"></i>
                                            </a>
                                        @endif

                                        @if (config('app.locale') == 'en')
                                            <div class="dropdown-menu" aria-labelledby="dropdownLanguage">
                                                <a class="dropdown-item" disabled href="/language/en"><img
                                                        src="{{ asset('template/img/blank.gif') }}" class="flag flag-gb"
                                                        alt="{{ __('English') }}" /> {{ __('English') }}</a>
                                                <a class="dropdown-item" href="/language/es"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-es" alt="{{ __('Español') }}" /> {{ __('Español') }}</a>

                                            </div>
                                        @else
                                            <div class="dropdown-menu" aria-labelledby="dropdownLanguage">
                                                <a class="dropdown-item" href="/language/es"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-es" alt="Español" /> {{ __('Español') }}</a>
                                                <a class="dropdown-item" href="/language/en"><img
                                                        src="{{ asset('template/img/blank.gif') }}"
                                                        class="flag flag-gb" alt="English" /> {{ __('English') }}</a>

                                            </div>
                                        @endif

                                    </li>
```
This will make use of the first language path and will only change the language of php and not javascript.

####Step 6
Now we will include the translations script for javascript, it can be included in the body or where you place your .js files.
```php
<script src="{{asset('laravel-translator.js')}}"></script>
```
####Step 7
Once you have added the script you can use it in any text you want to translate from javascript for example in an external .js file you can call the translation as follows.

```javascript
alert(lang.t('alerta de prueba'));
```
