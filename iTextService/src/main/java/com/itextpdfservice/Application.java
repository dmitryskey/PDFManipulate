package com.itextpdfservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application
{
    @RequestMapping("/")
    public String hello() {
        return "Hello";
    }

    @RequestMapping(value="/ex", method=RequestMethod.POST)
    public String ex(@RequestBody String fields) {
        return Controller.updatePdf(fields);
    }

    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}
