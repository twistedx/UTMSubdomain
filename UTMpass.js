(function () {
  function getUTM() {
    let params = {};
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    localStorage.setItem("params", JSON.stringify(params));
  }
  //adding this conditional check means the code wont overwrite the values once they are set.
  if (
    localStorage.getItem("params") &&
    localStorage.getItem("params").length > 3
  ) {
    console.log("do nothing");
  } else {
    console.log("run utms");
    getUTM();
  }

  queryParams = [
    "utm_medium", //add or remove query parameters you want to transfer
    "utm_source",
    "utm_campaign",
  ];
  domainsToDecorate = ["test.com"];
  // do not edit anything below this line
  const links = document.querySelectorAll(".outbound");
  console.log(links);
  // check if links contain domain from the domainsToDecorate array and then decorates
  if (localStorage.getItem("params").length > 3) {
    for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
      for (
        var domainIndex = 0;
        domainIndex < domainsToDecorate.length;
        domainIndex++
      ) {
        if (
          links[linkIndex].href.indexOf(domainsToDecorate[domainIndex]) > -1 &&
          links[linkIndex].href.indexOf("#") === -1
        ) {
          links[linkIndex].href = decorateUrl(links[linkIndex].href);
        }
      }
    }
  }

  // decorates the URL with query params
  function decorateUrl(urlToDecorate) {
    urlToDecorate =
      urlToDecorate.indexOf("?") === -1
        ? urlToDecorate + "?"
        : urlToDecorate + "&";

    var obj = JSON.parse(localStorage.getItem("params"));
    //console.log(obj);
    var collectedQueryParams = Object.keys(obj).map((key) => {
      obj[key];
    });
    for (var queryIndex = 0; queryIndex < queryParams.length; queryIndex++) {
      if (queryParams[queryIndex]) {
        collectedQueryParams.push(
          queryParams[queryIndex] + "=" + queryParams[queryIndex]
        );
      }
    }
    return urlToDecorate + collectedQueryParams.join("&");
  }
})();
