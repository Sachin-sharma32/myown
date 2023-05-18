import Head from "next/head";
import React from "react";

const MetaTags = () => {
    return (
        <div>
            <Head>
                <title>TBFE - Home</title>
                <link
                    rel="icon"
                    type="image/jpg"
                    href="/site-light-chopped.jpg"
                />
                <meta
                    name="description"
                    content='A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you&apos;re looking to
                    stay informed, learn something new, or simply be
                    entertained, "The Blog for Everything" has
                    something for everyone.'
                />
                <meta name="keywords" content="blog" />
                <meta
                    property="og:title"
                    content="TBFE -  A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics"
                />
                <meta
                    property="og:description"
                    content=" A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TheBlogForEverything" />
                <meta
                    property="og:image"
                    content="https://cdn.sanity.io/images/k0me7ccv/production/8fa01467c0ac00d838090a47782c009153f72a94-1024x1024.jpg"
                />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:locale" content="en_IN" />
                <meta
                    property="og:image:alt"
                    content="TheBlogForEverything logo"
                />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="400" />
                <meta
                    property="og:url"
                    content="https://www.theblogforeverything.com/"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TBFEpage" />
                <meta name="twitter:title" content="The Blog For Everything" />
                <meta
                    name="twitter:description"
                    content="A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta
                    name="twitter:image"
                    content="https://cdn.sanity.io/images/k0me7ccv/production/8fa01467c0ac00d838090a47782c009153f72a94-1024x1024.jpg"
                />
                <meta
                    name="og:url"
                    content="https://www.theblogforeverything.com/"
                />
            </Head>
        </div>
    );
};

export default MetaTags;
