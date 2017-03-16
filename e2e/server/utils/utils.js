const chalk = require('chalk');

const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
};

const RequestMethod = {
    DELETE: 'DELETE',
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
};

const Logger = {
    warn: (message) => console.log(chalk.yellow('[WARN] ' + message)),
    error: (message) => console.log(chalk.red('[ERROR] ' + message)),
    info: (message) => console.log(chalk.cyan('[INFO] ' + message)),
    success: (message) => console.log(chalk.green('[SUCCESS] ' + message))
}

function HATEOAS() {
    function createLinks (request, resource, links, mapping) {
        const urlPrefix = getUrlPrefix(request);

        return links.reduce((result, value) => {
            let href;
            let linkKey = value.rel;

            // Create fully qualified URL
            href = value.href.startsWith('/') ? urlPrefix + value.href : value.href;

            // Resolve placeholders in URL based on the provided mapping
            for (let [placeholder, resourceProperty] of Object.entries(mapping)) {
                href = href.replace(new RegExp(`:${placeholder}`, 'g'), resource[resourceProperty]);
            }

            result[linkKey] = {
                href: href,
                method: value.method
            }
            return result;
        }, {});
    }

    function getUrlPrefix (request) {
        return request.protocol + '://' + request.get('host');
    }

    function updateQueryStringParameter (url, key, value) {
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = url.indexOf('?') !== -1 ? "&" : "?";
        if (url.match(re)) {
            return url.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return url + separator + key + "=" + value;
        }
    }

    function wrapResource ({
        content,
        links,
        linkParametersMapping,
        request,
        linksProperty = '_links'
    } = {}) {
        let clonedContent = Object.assign({}, content);

        if (clonedContent && clonedContent.hasOwnProperty(linksProperty)) {
            throw new Error(`Resource already contains a property with name '${linksProperty}'`);
        }

        let mappedLinks = createLinks(request, clonedContent, links, linkParametersMapping);
        clonedContent[linksProperty] = mappedLinks;

        return clonedContent;
    }

    function wrapResources ({
        content,
        links,
        linkParametersMapping,
        request,
        linksProperty = '_links'
    } = {}) {
        let result;

        if (Array.isArray(content)) {
            result = content.map(item => wrapResource({
                content: item,
                links,
                linkParametersMapping,
                request,
                linksProperty
            }));
        } else {
            result = wrapResource({
                content,
                links,
                linkParametersMapping,
                request,
                linksProperty
            });
        }

        return result;
    };

    function wrapAsPageResource ({
        content,
        request,
        pageSize,
        page,
        collectionKey,
        currentPageProperty = 'currentPage',
        totalPagesProperty = 'totalPages',
        totalItemsProperty = 'totalItems',
        pageProperty = 'page',
        pageSizeProperty = 'size',
        contentProperty = '_embedded',
        linksProperty = '_links'
    } = {}) {
        const urlPrefix = getUrlPrefix(request);
        const originalUrl = urlPrefix + request.originalUrl;
        let wrapper = {};
        let embedded = {};
        let links = [{
            rel: 'self',
            href: originalUrl
        }];
        let firstPage, previousPage, currentPage, nextPage, lastPage, offset, url;

        // If query parameters are defined for pagination then assembe the wrapper
        if (!isNaN(page) && !isNaN(pageSize)) {
            nextPage = ((page + 1) * pageSize >= content.length) ? page : (page + 1);
            firstPage = 0;
            previousPage = (page - 1) > 0 ? (page - 1) : 0;
            lastPage = Math.floor(content.length / pageSize) - (content.length % pageSize === 0 && content.length > 0 ? 1 : 0);
            currentPage = page + 1;
            offset = page * pageSize;

            embedded[collectionKey] = content.filter((value, index) => {
                return (index >= offset) && index < (offset + pageSize);
            });

            url = updateQueryStringParameter(originalUrl, pageSizeProperty, pageSize);

            if (firstPage < page) {
                links.push({
                    rel: 'first',
                    href: updateQueryStringParameter(url, pageProperty, firstPage)
                });
            }
            if (previousPage < page) {
                links.push({
                    rel: 'prev',
                    href: updateQueryStringParameter(url, pageProperty, previousPage)
                });
            }
            if (nextPage > page) {
                links.push({
                    rel: 'next',
                    href: updateQueryStringParameter(url, pageProperty, nextPage)
                });
            }
            if (lastPage > page) {
                links.push({
                    rel: 'last',
                    href: updateQueryStringParameter(url, pageProperty, lastPage)
                });
            }

            wrapper[totalPagesProperty] = Math.ceil(content.length / pageSize);
            wrapper[currentPageProperty] = currentPage;
        }
        // otherwise return the whole dataset without pagination
        else {
            embedded[collectionKey] = content;
        }

        wrapper[contentProperty] = embedded;
        wrapper[linksProperty] = links.reduce((result, value) => {
            let linkKey = value.rel;
            result[linkKey] = {
                href: value.href,
                method: RequestMethod.GET
            };
            return result;
        }, {});
        wrapper[totalItemsProperty] = content.length;

        return wrapper;
    }

    const publicAPI = {
        wrapAsPageResource,
        wrapResource,
        wrapResources
    }

    return publicAPI;
};

module.exports = {
    HttpStatus,
    RequestMethod,
    Logger,
    HATEOAS: new HATEOAS()
};