import Layout from "@/Components/Layout";
import "@/styles/globals.css";
import "react-toggle/style.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
const publicVapidKey =
  "BEc2-0v3UehTphhFjanlWc_nQUkuodnenCdq8U1LQPE9TqSXGpABxtLc4zqhG1gJzuIjyGZjgnEP4XFt5aeiw5g";
let hasRan = false;

export default function App({ Component, pageProps }: AppProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg: ServiceWorkerRegistration) => {
        reg.pushManager.getSubscription().then((sub: any) => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const subscribeButtonOnClick = async (event: any) => {
    event.preventDefault();
    const subscription = await registration?.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({ subscription }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(await res.json());

    setSubscription(subscription);
    setIsSubscribed(true);
    console.log("web push subscribed!");
    console.log(subscription);
  };

  return (
    <Layout>
      {/* <button onClick={subscribeButtonOnClick} >
        Subscribe
      </button> */}

      <Component {...pageProps} />
    </Layout>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
