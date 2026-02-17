import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import OfficeSpaceCalculator from '../../components/OfficeSpaceCalculator';

export default function CalculatorPage() {
  const title = 'Office Space Calculator | Calgary Office Advisors';
  const description = 'Calculate your office space needs in Calgary. Get instant estimates for Class A, B, and C buildings with our interactive calculator.';

  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <OfficeSpaceCalculator />
      </Layout>
    </>
  );
}
