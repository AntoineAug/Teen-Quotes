<?php

/*
 * This file is part of the Teen Quotes website.
 *
 * (c) Antoine Augusti <antoine.augusti@teen-quotes.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeenQuotes\Auth\Controllers;

use Auth;
use BaseController;
use Carbon;
use Input;
use Lang;
use Laracasts\Validation\FormValidationException;
use Redirect;
use Session;
use TeenQuotes\Users\Models\User;
use TeenQuotes\Users\Repositories\UserRepository;
use TeenQuotes\Users\Validation\UserValidator;
use View;

class AuthController extends BaseController
{
    /**
     * @var \TeenQuotes\Users\Repositories\UserRepository
     */
    private $userRepo;

    /**
     * @var \TeenQuotes\Users\Validation\UserValidator
     */
    private $userValidator;

    public function __construct(UserRepository $userRepo, UserValidator $userValidator)
    {
        $this->beforeFilter('guest', ['only' => 'getSignin']);
        $this->beforeFilter('auth', ['only' => 'getLogout']);

        $this->userRepo      = $userRepo;
        $this->userValidator = $userValidator;
    }

    /**
     * Displays the signin form.
     *
     * @return \Response
     */
    public function getSignin()
    {
        $data = [
            'pageTitle'               => Lang::get('auth.signinPageTitle'),
            'pageDescription'         => Lang::get('auth.signinPageDescription'),
            'requireLoggedInAddQuote' => Session::has('requireLoggedInAddQuote'),
        ];

        return View::make('auth.signin', $data);
    }

    /**
     * Handles the signin form submission.
     *
     * @return \Response
     */
    public function postSignin()
    {
        $data = Input::only(['login', 'password']);

        try {
            $this->userValidator->validateSignin($data);
        } catch (FormValidationException $e) {
            return Redirect::route('signin')
                ->withErrors($e->getErrors())
                ->withInput(Input::except('password'));
        }

        // Try to log the user in.
        if (Auth::attempt($data, true)) {
            $user             = Auth::user();
            $user->last_visit = Carbon::now()->toDateTimeString();
            $user->save();

            return Redirect::intended(route('home'))->with('success', Lang::get('auth.loginSuccessfull', ['login' => $data['login']]));
        }
        // Maybe the user uses the old hash method
        else {
            $user = $this->userRepo->getByLogin($data['login']);

            if (!is_null($user) and ($user->password == User::oldHashMethod($data))) {
                // Update the password in database
                $user->password   = $data['password'];
                $user->last_visit = Carbon::now()->toDateTimeString();
                $user->save();

                Auth::login($user, true);

                return Redirect::intended(route('home'))->with('success', Lang::get('auth.loginSuccessfull', ['login' => $data['login']]));
            }

            return Redirect::route('signin')->withErrors(['password' => Lang::get('auth.passwordInvalid')])->withInput(Input::except('password'));
        }
    }

    /**
     * Log a user out.
     *
     * @return \Response
     */
    public function getLogout()
    {
        $login = Auth::user()->login;
        Auth::logout();

        return Redirect::route('home')->with('success', Lang::get('auth.logoutSuccessfull', compact('login')));
    }
}
