<?php
namespace App\Enums;
use BenSampo\Enum\Enum;

final class ApiStatus extends Enum {
    const Success = "S001";
    const Failure = "F001";
    public static function getDescription( $value ): string {
        switch ( $value ) {
        case self::Success:
            return 'Success';
            break;
        case self::Failure:
            return 'Failure';
            break;
        default:
            return self::getKey( $value );
        }
    }
}
