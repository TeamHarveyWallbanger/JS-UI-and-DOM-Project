var validateName = (function () {
    function validateName(name) {
        if (name === '' || name.length > 20) {
            throw { name: 'InvalidArgumentError', message: 'Name should be between 1 and 20 sybols.' };
        }

        if (/[^ A-z]+/.test(name)) {
            throw { name: 'InvalidArgumentError', message: 'Name should contain only letters and spaces.' };
        }
    }

    return validateName;
}());

var validateScore = (function () {
    function validateScore(score) {
        if (isNaN(score)) {
            throw { name: 'InvalidArgumentError', message: 'Score should be a number' };
        }

        if (score < 0) {
            throw { name: 'InvalidArgumentError', message: 'Score should be 0 or more.' };
        }
    }

    return validateScore;
}());