<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
        //    'name' => 'required',
        //    'code' => 'required|unique:App\Models\User,id',
        //    'email' => 'required',
        //    'password' => 'required',
        //    'type' => 'required',
        ];
    }
    public function message(): array
    {
        return [
        //    'name.required' => 'Required',
        //    'code.required' => 'Required',
        //    'code.unique' => 'Already Exists',
        //    'email.required' => 'Required',
        //    'password.required' => 'Required',
        //    'type.required' => 'Required',
        ];
    }
}
