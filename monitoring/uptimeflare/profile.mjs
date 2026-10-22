export const pageConfig = {
  title: 'KC Veteran Tech Builders availability',
  links: [{ label: 'Community website', link: 'https://kc-veteran-tech-builders.hm2krebsmatthewl.workers.dev/' }]
};
export const workerConfig = {
  monitors: [
    {
      id: 'kcvtb-public-home', name: 'Community website', method: 'GET',
      target: 'https://kc-veteran-tech-builders.hm2krebsmatthewl.workers.dev/',
      expectedCodes: [200], timeout: 10000,
      responseKeyword: 'KC Veteran Tech Builders',
      tooltip: 'Public page availability only; not a test of interest submissions.'
    },
    {
      id: 'kcvtb-storage-health', name: 'Database connectivity', method: 'GET',
      target: 'https://kc-veteran-tech-builders.hm2krebsmatthewl.workers.dev/health',
      expectedCodes: [200], timeout: 10000,
      responseKeyword: '"storage":"available"',
      tooltip: 'Existing SELECT 1 health check; does not verify schema or writes.'
    }
  ]
};
export const maintenances = [];
