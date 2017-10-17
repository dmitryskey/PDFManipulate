package com.itextpdfservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@RestController
public class Application
{
    @RequestMapping("/")
    public String iTextWrapper() {
        return "iText REST Wrapper";
    }

    @CrossOrigin
    @RequestMapping(value="/update", method=RequestMethod.POST)
    public String update(@RequestBody String fields) {
        return Controller.update(fields);
    }

    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}
