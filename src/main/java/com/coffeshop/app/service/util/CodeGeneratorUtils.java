package com.coffeshop.app.service.util;

import java.security.SecureRandom;
import java.time.Year;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CodeGeneratorUtils {

    public static String regCodeGenerator(String code){
        SecureRandom random = new SecureRandom();
        int number = 100000 + random.nextInt(900000);

        Year year = Year.now();

        String result = code+String.valueOf(year)+shuffleInt(number);//result using shuffleInt method

        return result;
    }

    private static String shuffleInt(int number){
        List<String> arrayList= new ArrayList<>();

        for (int i = 0; i <String.valueOf(number).length() ; i++) {
            arrayList.add(String.valueOf(String.valueOf(number).charAt(i)));
        }

        Collections.shuffle(arrayList);

        return String.join("", arrayList);
    }

}
