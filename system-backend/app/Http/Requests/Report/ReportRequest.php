<?php

namespace App\Http\Requests\Report;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
{

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
            'issue_type' => 'nullable',
            'description' => 'nullable',
            'reported_date' => 'nullable',
            'user_id' => 'nullable',
            'location_id' => 'nullable',
            'image_id'=> 'nullable',
            'votes' => 'nullable',
        ];
    }

    public function message(): array{
        return [
            'title.required' => 'Required',
            'issue_type.required' => 'Required'
        ];
    }
}
