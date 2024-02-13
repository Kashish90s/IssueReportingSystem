<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class IssueStatus extends Enum
{
    const Processing = 0;
    const Complete = 1;
    const OutOFOrder = 2;
}
