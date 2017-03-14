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

const Logger = {
    warn: (message) => console.log(chalk.yellow('[WARN] ' + message)),
    error: (message) => console.log(chalk.red('[ERROR] ' + message)),
    info: (message) => console.log(chalk.cyan('[INFO] ' + message)),
    success: (message) => console.log(chalk.green('[SUCCESS] ' + message))
}

function HATEOAS() {
    function createLinks (request, resource, links, mapping) {
        const urlPrefix = getUrlPrefix(request);

        return links.map(linkDescriptor => {
            let link = {};
            let href;

            // Create fully qualified URL
            href = linkDescriptor.href.startsWith('/') ? urlPrefix + linkDescriptor.href : linkDescriptor.href;

            // Resolve placeholders in URL based on the provided mapping
            for (let [placeholder, resourceProperty] of Object.entries(mapping)) {
                href = href.replace(new RegExp(`:${placeholder}`, 'g'), resource[resourceProperty]);
            }

            link.rel = linkDescriptor.relation;
            link.href = href;

            return link;
        });
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
        contentProperty = 'content',
        linksProperty = 'links'
    } = {}) {

        let wrapper = {};
        let mappedLinks = createLinks(request, content, links, linkParametersMapping);

        wrapper[contentProperty] = content;
        wrapper[linksProperty] = mappedLinks;

        return wrapper;
    }

    function wrapResources ({
        content,
        links,
        linkParametersMapping,
        request,
        contentProperty = 'content',
        linksProperty = 'links'
    } = {}) {
        let result;

        if (Array.isArray(content)) {
            result = content.map(item => wrapResource({
                content: item,
                links,
                linkParametersMapping,
                request,
                contentProperty,
                linksProperty
            }));
        } else {
            result = wrapResource({
                content,
                links,
                linkParametersMapping,
                request,
                contentProperty,
                linksProperty
            });
        }

        return result;
    };

    function wrapAsPageResource ({
        content,
        links,
        request,
        pageSize,
        page,
        currentPageProperty = 'currentPage',
        totalPagesProperty = 'totalPages',
        totalItemsProperty = 'totalItems',
        pageProperty = 'page',
        pageSizeProperty = 'size',
        contentProperty = 'content',
        linksProperty = 'links'
    } = {}) {
        const urlPrefix = getUrlPrefix(request);
        const originalUrl = urlPrefix + request.originalUrl;
        let wrapper = {};
        let mappedLinks = [{
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

            wrapper[contentProperty] = content.filter((value, index) => {
                return (index >= offset) && index < (offset + pageSize);
            });

            url = updateQueryStringParameter(originalUrl, pageSizeProperty, pageSize);

            if (firstPage < page) {
                mappedLinks.push({
                    rel: 'first',
                    href: updateQueryStringParameter(url, pageProperty, firstPage)
                });
            }
            if (previousPage < page) {
                mappedLinks.push({
                    rel: 'previous',
                    href: updateQueryStringParameter(url, pageProperty, previousPage)
                });
            }
            if (nextPage > page) {
                mappedLinks.push({
                    rel: 'next',
                    href: updateQueryStringParameter(url, pageProperty, nextPage)
                });
            }
            if (lastPage > page) {
                mappedLinks.push({
                    rel: 'last',
                    href: updateQueryStringParameter(url, pageProperty, lastPage)
                });
            }

            wrapper[linksProperty] = mappedLinks;
            wrapper[totalPagesProperty] = Math.ceil(content.length / pageSize);
            wrapper[currentPageProperty] = currentPage;
        }
        // otherwise return the whole dataset without pagination
        else {
            wrapper[contentProperty] = content;
        }

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
    Logger,
    HATEOAS: new HATEOAS()
};