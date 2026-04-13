from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return response

    data = {
        "success": False,
        "message": "Request failed",
        "errors": None,
    }

    if isinstance(response.data, dict):
        if "detail" in response.data:
            data["message"] = response.data["detail"]
        else:
            data["message"] = "Validation error"
            data["errors"] = response.data
    else:
        data["message"] = response.data

    response.data = data
    return response
