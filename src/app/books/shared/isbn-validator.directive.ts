import { AbstractControl, ValidatorFn } from '@angular/forms';

const validISBNPattern: RegExp = /^\d{9}(X|\d)$|^\d{13}$/;
const empty = '';
const validatorKey = 'isbn';

function validate(control: AbstractControl): {[key: string]: any} {
    let isbnArr: RegExpExecArray = validISBNPattern.exec(control.value);
    let isbn: string = isbnArr ? isbnArr[0] : null;
    let isValid: boolean;
    let sum: number = 0;

    if (isbn && isbn.length === 10) {
        let chars = isbn.split(empty);

        if (chars[9].toUpperCase() === 'X') {
            chars[9] = '10';
        }

        chars.forEach((value, index) => {
            sum += ((10 - index) * parseInt(value, 10));
        });

        isValid = (sum % 11 === 0);
    } else if (isbn && isbn.length === 13) {
        let chars = isbn.split(empty);

        chars.forEach((value, index) => {
            if (index % 2 === 0) {
                sum += parseInt(value, 10);
            } else {
                sum += parseInt(value, 10) * 3;
            }
        });

        isValid = (sum % 10 === 0);
    } else {
        isValid = false;
    }

    return isValid ? null : { [validatorKey] : isValid };
}

export class ISBNValidator {
    static checkISBN(control: AbstractControl): {[key: string]: any} {
        return validate(control);
    }
}
