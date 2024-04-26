<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $userId = $this->route('user');
        return [
            //RFC 5322 standard for email addresses
            // 'email' => 'required|email:rfc,dns','max:255',Rule::unique('users')->ignore($userId),
            //. operator also used as a ignore syntax
            'email' => 'required|email:rfc,dns|max:255|unique:users,email,'.$this->id,
            'password' => 'required|min:8',
            'code' => 'nullable',
            'dob' => 'nullable|date',
            'google_id' => 'nullable',
        ];
    }
}
