import Validator from "validator";
import isEmpty from "is-empty";

export default function validateArtistInput(data) {
    let errors = {};
    data.artistsname = !isEmpty(data.artistsname) ? data.artistsname : "";
    data.geners = !isEmpty(data.geners) ? data.geners : "";
    data.date = !isEmpty(data.date) ? data.date : "";

    if (Validator.isEmpty(data.artistsname)) {
        errors.artistsname = "Atistsname field is required";
    }
    if (Validator.isEmpty(data.geners)) {
        errors.geners = "Geners field is required";
    }
    if (Validator.isEmpty(data.date)) {
        errors.date = "Date field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};