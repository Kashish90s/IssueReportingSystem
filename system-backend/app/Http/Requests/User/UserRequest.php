<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');
        return [
            'name' => 'required',
            //RFC 5322 standard for email addresses
            'email' => 'required|email:rfc,dns','max:255',Rule::unique('users')->ignore($userId),
            'password' => 'required',
        ];
    }
    public function message(): array
    {
        return [
            'name.required' => 'Required',
            'email.required' => 'Required',
            'email.email' => 'Email type invalid',
            'password.required' => 'Required',
        ];
    }
}
