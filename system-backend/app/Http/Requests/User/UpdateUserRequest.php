<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => 'nullable',
            'email' => 'sometimes|email:rfc,dns|max:255|unique:users,email,'.$this->id,
            'password' => 'sometimes|min:8',
            'confirmPassword' => 'sometimes|min:8',
            'dob' => 'nullable|date',
        ];
    }
}
