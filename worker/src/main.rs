use reqwest::{Client, blocking};
use std::{
    thread, time::{self, Duration},
};
#[derive(serde::Serialize)]
struct HostData {
    hostname: String,
    operating_system: String,
    kernel: String,
    architecture: String,
}

impl HostData {
    fn getSample() -> HostData {
        HostData {
            hostname: String::from("Leonard-Mint"),
            operating_system: String::from("Linux-Mint"),
            kernel: String::from("Linux 7"),
            architecture: String::from("X86"),
        }
    }
}
fn main() {
    let args: Vec<String> = std::env::args().collect();
    println!("{:?}", args);

    const TEN_MILLIS: Duration = time::Duration::from_secs(11);

    println!("Worker started");
    let client = reqwest::blocking::Client::new();
    loop {
        thread::sleep(TEN_MILLIS);

        let res = client.post(&args[1])
        .json(&HostData::getSample())
        .send();
        println!("{:#?}", res)
    }
}

fn get_data() -> HostData {
    HostData {
        hostname: String::from("value"),
        operating_system: String::from("value"),
        kernel: String::from("value"),
        architecture: String::from("value"),
    }
}
