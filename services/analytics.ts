const ServiceCRM = () => {
  return {
    updateUser: (id: string, properties: Record<string, any>) => {
      console.log("ServiceCRM", id, properties);
    },
  };
};

const useAnalytics = () => {
  const serviceCRM = ServiceCRM();
  return {
    track: (event: string, properties: Record<string, any>) => {
      console.log(event, properties);
    },
    screen: (name: string) => {
      console.log(name);
    },
    identify: (id: string, properties: Record<string, any>) => {
      serviceCRM.updateUser(id, properties);
      console.log(id, properties);
    },
  };
};

export default useAnalytics;
