from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    responce = exception_handler(exc, context)

    if responce is None:
        return responce
    
    data = {
        "succsess": False,
        "message": "request failed",
        "errors": None,
    }

    if isinstance(responce.data, dict):
        if "deteil" in responce.data:
            data["message"] = responce.data["deteil"]
        else:
            data["message"] = "validation error"
            data["errors"] = responce.data
    else:
        data["message"] = responce.data

    responce.data = data
    return responce