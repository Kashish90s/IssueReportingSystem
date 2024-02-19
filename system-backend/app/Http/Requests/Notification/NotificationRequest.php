<?php

namespace App\Http\Requests\Notification;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
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
            'title' => 'required',
            'description' => 'required',
            'notification_date' => 'nullable|date',
            'user_id' => 'nullable',
            'report_id' => 'nullable',
            'image_id' => 'nullable'
        ];
    }
    public function message(): array{
        return [
            'title.required' => 'Required',
            'description.required' => 'Required'
        ];
    }
}
