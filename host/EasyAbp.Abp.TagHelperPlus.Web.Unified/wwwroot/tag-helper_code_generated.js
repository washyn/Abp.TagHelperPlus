window.addEventListener(
    "load",
    function () {
        $(function () {
            let currentValues = null;
            function stringMatch(term, candidate) {
                return candidate && candidate.toLowerCase().indexOf(term.toLowerCase()) >= 0;
            }
            function matchCustom(params, data) {
                if ($.trim(params.term) === "") {
                    return data;
                }
                if (typeof data.text === "undefined") {
                    return null;
                }
                if (stringMatch(params.term, data.text)) {
                    return data;
                }
                if (stringMatch(params.term, state.id)) {
                    return data;
                }
                return null;
            }
            let select2Item = function (state) {
                return $("<span>" + state.text + '<a class="selection-subtext">' + state.id + "</a>" + "</span>");
            };
            let select2Option = {
                allowClear: true,
                width: "100%",
                matcher: matchCustom,
                templateResult: select2Item,
                templateSelection: select2Item,
                ajax: {
                    url: "/api/identity/users",
                    dataType: "json",
                    delay: 250,
                    data: function (params) {
                        params.page = params.page || 1;
                        return { filter: params.term, skipCount: (params.page - 1) * 10, maxResultCount: 10 };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        return {
                            results: data.items.map(function (item) {
                                return { id: item.id, text: item.name ?? item.userName };
                            }),
                            pagination: { more: params.page * 10 < data.totalCount },
                        };
                    },
                    cache: true,
                },
                placeholder: { id: "", text: "" },
            };
            $("#ViewModel_UserId").select2(select2Option);
            currentValues &&
            currentValues.values.forEach(function (e) {
                if (!$("#ViewModel_UserId").find("option:contains(" + e + ")").length && e != "00000000-0000-0000-0000-000000000000" && e != "" && e != "0")
                    abp.ajax({
                        type: "GET",
                        url: "/api/identity/users/{id}".replace("{id}", e),
                        success: function (result) {
                            $("#ViewModel_UserId").append($('<option value="' + e + '">').text(result.name ?? result.userName));
                            $("#ViewModel_UserId").val(currentValues.values).trigger("change");
                        },
                    });
            });
        });
    },
    false
);
