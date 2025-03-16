from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

congestion_level = "원활"


@csrf_exempt
def congestion(request):
    global congestion_level

    if request.method == "POST":
        value = int(request.POST.get("value"))
        print("받은 값:", value)

        # 값을 원활, 약간 혼잡, 혼잡으로 분류
        if value < 10:
            congestion_level = "원활"
        elif value <= 20:
            congestion_level = "약간 혼잡"
        else:
            congestion_level = "혼잡"

        print("congestion_level:", congestion_level)
        return JsonResponse({"success": True, "congestion_level": congestion_level})
    elif request.method == "GET":
        print("congestion_level:", congestion_level)
        return JsonResponse({"success": True, "congestion_level": congestion_level})
    else:
        return JsonResponse({"success": False, "error": "지원되지 않는 HTTP 메소드입니다."})
