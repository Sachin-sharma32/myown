import { useRouter } from "next/router";
import { getHostnameDataBySubdomain, getSubdomainPaths } from "../../../lib/db";
import Home from "../../../sites/index";
import Cms from "../../../sites/cms/index";

export default function Index(props) {
  const router = useRouter();
  props;

  if (router.isFallback) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <div className="w-screen">
      {props.name == "home" && <Home />}
      {props.name == "cms" && <Cms />}
    </div>
  );
}

// Getting the paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await getSubdomainPaths();

  return {
    paths,
    fallback: true,
  };
}

// Getting data to display on each custom subdomain
export async function getStaticProps({ params: { site } }) {
  const sites = await getHostnameDataBySubdomain(site);
  let component;
  site;
  if (site == "home") {
    component = "home";
  } else if (site == "cms") {
    component = "cms";
  }
  return {
    props: { name: component },
    // props: sites,
    revalidate: 3600,
  };
}
