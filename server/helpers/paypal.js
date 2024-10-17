import paypal from "paypal-rest-sdk";

paypal.configure({
	mode: "sandbox",
	client_id: "AZLAi9J0yslvneXz24lpxzQNxU987Z3foQoPvJCKhF_GsTIS5orbfRIVTCvO25NLfC-ppZvE9luMKvoT",
	client_secret: "EKqVj5LPbvRK5W0hh7oOt7EnsP3dn53HkZh6ha_Nz4hSv7pI0w8Zczc-zoFoL_P1w89SAFSCn-xqBrc-",
});

export default paypal;
