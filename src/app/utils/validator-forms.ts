import { FormControl, FormGroup } from '@angular/forms';

export abstract class ValidatorsForms {

  hasUpperCasePass(control: FormControl) {
    const valid = /[A-Z]/.test(control.value);
    // console.log(`hasUpperCasePass => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasUpperCase: true
    };
  }

  hasLowerCasePass(control: FormControl) {
    const valid = /[a-z]/.test(control.value);
    // console.log(`hasLowerCasePass => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasLowerCase: true
    };
  }

  hasLetters(control: FormControl) {
    const valid = /[A-Za-zñÑ]/.test(control.value);
    // console.log(`hasLowerCasePass => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasLetters: true
    };
  }

  hasNumbers(control: FormControl) {
    const valid = /\d/.test(control.value);
    // console.log(`hasNumbers => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasNumbers: true
    };
  }

  hasNonalphas(control: FormControl) {
    const valid = /\W/.test(control.value);
    // console.log(`hasNonalphas => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasNonalphas: true
    };
  }


  hasAlphanum(control: FormControl) {
    const valid = /[a-zA-Z0-9ñÑ]/.test(control.value);
    // console.log(`hasNonalphas => ${valid}`);
    if (valid) {
      return null;
    }

    return {
      hasAlphanum: true
    };
  }

  // Custom Validator que valida que la constraseña y repetir contraseña sean iguales
  areEqual(group: FormGroup) {
    let valid = false;
    const pass = group.controls['newPassword'].value;
    const rpass = group.controls['repeatPassword'].value;

    if (pass !== undefined && rpass !== undefined) {
      valid = pass === rpass;
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
